# Automating NEAR: A Swappable, Token-Optimized Multi-Agent n8n Factory

_Externally-supplied blueprint, pasted by the operator into BACKLOG.md on 2026-09-06 and
extracted here to keep the backlog readable. Not a decision — the open question it is
attached to still lives in BACKLOG.md section 4. Unevaluated as written: it references
skill filenames (`near_tips_writer.md`, `editor_persona.md`) that do not exist in this repo,
and model names that are several generations stale._

---


Since NEAR.TIPS relies heavily on a specific editorial voice and structured directory data, transitioning to an automated n8n pipeline requires precision. Your goal is to orchestrate multiple agents (Scouts, Researchers, Writers, Editors) while reusing your existing `.claude/skills/` logic, remaining completely model-agnostic, and keeping token costs at absolute zero waste.

Here is the blueprint for building the NEAR.TIPS content engine in n8n.

## 1. The Core Principle: Progressive Disclosure via Sub-Workflows

To prevent token bloat, you must **never** put all your agents into a single chat window or a single workflow loop. If the Writer agent sees the Researcher's raw Google search API JSON, you are wasting thousands of tokens.

Instead, build a **Master Orchestrator Workflow** that triggers isolated **Sub-Workflows**. Each sub-workflow is a distinct agent that boots up, does one job statelessly, returns a clean string of text, and shuts down.

## 2. Bridging Your Existing Claude Skills

You have already invested heavily in `.claude/skills/` markdown files for your personas and logic. You do not need to rewrite these into n8n nodes.

**The Strategy:**

In your n8n workflows, whenever an AI Agent needs a system prompt, do not type it manually.

1. Add a **Read File** node (if n8n runs locally/on the same server) or a **GitHub / HTTP Request** node (if pulling from your repo).
    
2. Point it to `~/.claude/skills/near_tips_writer.md`.
    
3. Feed the output of that file directly into the **System Message** field of the AI Agent node.
    

If you ever update the skill file in VS Code, your n8n automations automatically inherit the new logic on their next run.

## 3. Building the NEAR Sub-Workflows (The Agents)

Create these distinct workflows in n8n. Notice how the models are treated as swappable plugins.

### Agent 1: The Scout (Low Token / Fast Model)

**Goal:** Take a new location name (e.g., "Il Chiosco che alzò la bandiera") and strategize what data is needed for the directory card.

- **Trigger:** Execute Workflow Trigger (receives `location_name` and `city`).
    
- **Model Plugin:** Google Gemini 1.5 Flash or Claude 3.5 Haiku (Fast & Cheap).
    
- **Prompt Logic:** "You are the NEAR.TIPS scout. Identify 3 key angles to research for this location to fit our brutalist, direct editorial style. Output JSON: `{"angles": [...]}`."
    
- **Output:** The JSON angles.
    

### Agent 2: The Local Researcher (Tool-Heavy)

**Goal:** Gather facts, hours, and history.

- **Trigger:** Execute Workflow Trigger (receives the `angles` JSON).
    
- **Model Plugin:** Gemini 1.5 Flash / Claude 3.5 Haiku.
    
- **Tools:** n8n MCP Client (connecting to your existing search/scraping tools) or SerpAPI.
    
- **Prompt Logic:** "Research the provided angles. Extract factual data: history, vibe, and operational status. Summarize findings into a dense bulleted list."
    
- **Output:** A string named `research_dossier`.
    

### Agent 3: The Brutalist Writer (High Reasoning / Deep Context)

**Goal:** Draft the directory card content fitting the UI constraints.

- **Trigger:** Execute Workflow Trigger (receives `location_name` and `research_dossier`).
    
- **Data Prep:** Read `.claude/skills/near_tips_brutalist_voice.md`.
    
- **Model Plugin:** Claude 3.5 Sonnet or Gemini 1.5 Pro (The heavy lifters).
    
- **Prompt Logic:** "Inject the skill file as the System Prompt. Write the directory entry using the `research_dossier`. Adhere strictly to the structural limits of our UI cards (max 40 words for the excerpt)."
    
- **Output:** Returns `draft_copy`.
    

### Agent 4: The Formatting Editor (Strict Review)

**Goal:** QA the text and format it for the Vercel/GitHub pipeline.

- **Trigger:** Execute Workflow Trigger (receives `draft_copy`).
    
- **Model Plugin:** High reasoning model.
    
- **Prompt Logic:** Read `.claude/skills/near_tips_formatting.md`. "Review this draft. Ensure it matches the requested character counts and brutalist tone. Output final frontmatter and markdown."
    
- **Output:** Returns `final_markdown`.
    

## 4. The Master Orchestrator (The Token Saver)

This is your main workflow that ties the factory together.

1. **Trigger:** A Webhook (maybe triggered from your phone) receiving a place name.
    
2. **Execute Agent 1 (Scout):**
    
3. **Execute Agent 2 (Researcher):** Passes the Scout's output.
    
4. **The Token Firewall (Edit Fields Node):** _CRITICAL STEP._ After the Researcher runs, n8n will hold a massive JSON object containing all the API calls, search results, and agent thoughts. **Use an Edit Fields (Set) node here.** Configure it to keep _only_ the `research_dossier` string and delete everything else in the payload.
    
5. **Execute Agent 3 (Writer):** Passes _only_ the clean `research_dossier` and the `location_name`. The Writer has no idea _how_ the research was gathered, saving massive context.
    
6. **Execute Agent 4 (Editor):** Passes the draft.
    
7. **Output (GitHub/Vercel):** The final node pushes the `final_markdown` directly to your GitHub repo, which automatically triggers your Vercel build, updating NEAR.TIPS instantly.
    

## 5. How to Swap Brains Instantly

Because you used n8n's **Advanced AI** nodes, the model is physically separated from the logic. If Claude goes down, or Gemini releases a superior model for writing:

1. Open the Writer Sub-workflow.
    
2. Delete the "Anthropic Chat Model" node attached to the AI Agent.
    
3. Drag in a "Google Gemini Chat Model" node.
    
4. Connect it.
    
    Your `.claude/skills` integration, memory, and orchestration remain 100% untouched.
