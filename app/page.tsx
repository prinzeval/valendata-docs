'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './docs.module.css';

const NAV = [
  {
    section: 'Overview',
    items: [
      { id: 'intro', label: 'Introduction' },
    ],
  },
  {
    section: 'Core Concepts',
    items: [
      { id: 'skills', label: 'Skills' },
      { id: 'workflows', label: 'Workflows' },
      { id: 'credits', label: 'Credits & Billing' },
    ],
  },
];

const ON_THIS_PAGE: Record<string, { id: string; label: string }[]> = {
  intro: [
    { id: 'what-is', label: 'What is Valendata?' },
    { id: 'how-it-works', label: 'How it works' },
  ],
  skills: [
    { id: 'what-is-skill', label: 'What is a Skill?' },
    { id: 'creating', label: 'Creating a Skill' },
    { id: 'running', label: 'Running a Skill' },
    { id: 'publishing', label: 'Publishing a Skill' },
  ],
  workflows: [
    { id: 'what-is-workflow', label: 'What is a Workflow?' },
    { id: 'building', label: 'Building a Workflow' },
    { id: 'scheduling', label: 'Scheduling' },
  ],
  credits: [
    { id: 'how-credits-work', label: 'How credits work' },
    { id: 'purchasing', label: 'Purchasing credits' },
    { id: 'auto-recharge', label: 'Auto-recharge' },
    { id: 'plans', label: 'Plans' },
  ],
};

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLang}>{lang}</span>
        <button className={styles.copyBtn} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.codePre}><code>{code}</code></pre>
    </div>
  );
}

function Callout({ type = 'tip', children }: { type?: 'tip' | 'warning' | 'info'; children: React.ReactNode }) {
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className={`${styles.callout} ${styles[`callout_${type}`]}`}>
      <span className={styles.calloutIcon}>{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────

function IntroContent() {
  return (
    <div className={styles.content}>
      <div className={styles.breadcrumb}>Overview</div>
      <h1 className={styles.pageTitle}>Introduction</h1>
      <p className={styles.lead}>
        Valendata is an AI-powered browser automation platform. You describe what you want done
        — the agent opens a real browser, navigates the web, and returns structured results.
      </p>

      <h2 id="what-is" className={styles.h2}>What is Valendata?</h2>
      <p className={styles.p}>
        Valendata lets you build, run, and schedule browser automations without writing brittle
        selectors or maintaining scraper code. You write a plain-English task — the AI figures out
        how to do it using a real browser session.
      </p>
      <p className={styles.p}>
        Everything runs in the cloud. You get live screenshots, structured output, and a full
        credit-based usage ledger so you always know what each run costs.
      </p>

      <h2 id="how-it-works" className={styles.h2}>How it works</h2>
      <p className={styles.p}>
        1. You write a <strong>Skill</strong> — a named, reusable task description with optional parameters.
      </p>
      <p className={styles.p}>
        2. You run the Skill — either manually from the dashboard, on a cron schedule, or chained
        inside a <strong>Workflow</strong>.
      </p>
      <p className={styles.p}>
        3. The agent uses a managed browser session, executes the task step-by-step, and returns
        the result. Credits are deducted based on LLM usage and browser session time.
      </p>

      <div className={styles.cardGrid}>
        {[
          { label: 'Skills →', desc: 'Named, reusable automation tasks' },
          { label: 'Workflows →', desc: 'Chain multiple skills together' },
          { label: 'Credits →', desc: 'Pay-as-you-go usage billing' },
        ].map(c => (
          <div key={c.label} className={styles.nextCard}>
            <div className={styles.nextCardLabel}>{c.label}</div>
            <div className={styles.nextCardDesc}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div className={styles.content}>
      <div className={styles.breadcrumb}>Core Concepts</div>
      <h1 className={styles.pageTitle}>Skills</h1>
      <p className={styles.lead}>
        A Skill is a named, reusable browser automation task. You describe the goal once, save it,
        and run it as many times as you need — from the dashboard, on a schedule, or inside a Workflow.
      </p>

      <h2 id="what-is-skill" className={styles.h2}>What is a Skill?</h2>
      <p className={styles.p}>
        A Skill has a name, a task description, and optional input parameters. When you run it,
        Valendata spins up a browser session and executes the task using that description as the
        agent&apos;s instruction.
      </p>
      <p className={styles.p}>
        Think of a Skill like a saved function — you define it once and call it whenever you need it.
      </p>

      <h2 id="creating" className={styles.h2}>Creating a Skill</h2>
      <p className={styles.p}>
        Go to <strong>Dashboard → Skills → New Skill</strong>. Give it a name and write the task
        in plain English. You can reference input parameters using double curly braces:
      </p>
      <CodeBlock lang="text" code={`Go to {{url}} and extract the title, description, and price of the first product listed.
Return the result as JSON.`} />
      <p className={styles.p}>
        When you run this Skill you&apos;ll be prompted to fill in <code>url</code>. You can also
        hard-code values if the Skill is meant to always do the same thing.
      </p>
      <Callout type="tip">Keep task descriptions direct and specific. The more precise you are, the fewer steps the agent needs — which means fewer credits used.</Callout>

      <h2 id="running" className={styles.h2}>Running a Skill</h2>
      <p className={styles.p}>
        Click <strong>Run</strong> from the Skills list. Fill in any required parameters, choose
        a browser mode (local or remote), and hit <strong>Start</strong>.
      </p>
      <p className={styles.p}>
        You&apos;ll see a live view with screenshots as the agent works. When it finishes, the
        result appears in the output panel and is saved to the run history.
      </p>
      <Callout type="info">Remote browser mode runs a managed cloud browser — no setup needed. Local mode uses the browser on your machine via the Valendata extension.</Callout>

      <h2 id="publishing" className={styles.h2}>Publishing a Skill</h2>
      <p className={styles.p}>
        Published Skills can be shared with your team or made available on the marketplace.
        Once published, the Skill gets a public slug that others can use to run it.
      </p>
      <p className={styles.p}>
        You control visibility — keep it private (team-only) or make it public. You can unpublish
        at any time.
      </p>
    </div>
  );
}

function WorkflowsContent() {
  return (
    <div className={styles.content}>
      <div className={styles.breadcrumb}>Core Concepts</div>
      <h1 className={styles.pageTitle}>Workflows</h1>
      <p className={styles.lead}>
        Workflows let you chain multiple Skills together into a single automated pipeline.
        Each step can pass its output as input to the next — no glue code required.
      </p>

      <h2 id="what-is-workflow" className={styles.h2}>What is a Workflow?</h2>
      <p className={styles.p}>
        A Workflow is an ordered sequence of Skills. You define the steps, map outputs to
        inputs between them, and run the whole thing as one job. Valendata executes each
        step in order and tracks the run as a single session.
      </p>
      <p className={styles.p}>
        Example: a three-step Workflow that (1) searches for leads on LinkedIn, (2) extracts
        contact details from each profile, and (3) writes the results to a Google Sheet.
      </p>

      <h2 id="building" className={styles.h2}>Building a Workflow</h2>
      <p className={styles.p}>
        Go to <strong>Dashboard → Workflows → New Workflow</strong>. Add Skills as steps by
        selecting from your saved Skills library. For each step you can:
      </p>
      <p className={styles.p}>• Hard-code input values</p>
      <p className={styles.p}>• Map them from a previous step&apos;s output using <code className={styles.inlineCode}>{'{{step_1.result.field}}'}</code> syntax</p>
      <p className={styles.p}>• Prompt the user at runtime</p>

      <Callout type="tip">
        Start with two-step Workflows to get comfortable with output mapping before building
        longer chains.
      </Callout>

      <h2 id="scheduling" className={styles.h2}>Scheduling</h2>
      <p className={styles.p}>
        Any Workflow (or individual Skill) can be put on a schedule. Go to the Workflow detail
        page and click <strong>Schedule</strong>. Pick a cron expression or use one of the
        preset options (hourly, daily, weekly).
      </p>
      <CodeBlock lang="text" code={`# Example cron expressions
0 9 * * 1-5   →  Every weekday at 9 AM
0 */6 * * *   →  Every 6 hours
0 8 * * 1     →  Every Monday at 8 AM`} />
      <p className={styles.p}>
        Scheduled runs are queued automatically. If a run is missed (e.g. the system was down)
        it will be caught up on the next scheduled interval.
      </p>
      <Callout type="warning">Scheduled runs consume credits just like manual runs. Make sure you have enough balance or auto-recharge enabled before setting up high-frequency schedules.</Callout>
    </div>
  );
}

function CreditsContent() {
  return (
    <div className={styles.content}>
      <div className={styles.breadcrumb}>Core Concepts</div>
      <h1 className={styles.pageTitle}>Credits & Billing</h1>
      <p className={styles.lead}>
        Credits are how Valendata meters usage. Every run consumes credits based on how much
        LLM processing and browser time it uses. You buy credits upfront and spend them as you go.
      </p>

      <h2 id="how-credits-work" className={styles.h2}>How credits work</h2>
      <p className={styles.p}>
        When a Skill or Workflow runs, Valendata tracks:
      </p>
      <p className={styles.p}>• <strong>LLM tokens</strong> — the AI reasoning behind every step</p>
      <p className={styles.p}>• <strong>Browser session time</strong> — how long the browser was open</p>
      <p className={styles.p}>• <strong>Web searches</strong> — if the agent searches the web mid-task</p>
      <p className={styles.p}>
        At the end of the run, the total cost is calculated and deducted from your credit balance.
        You can see the breakdown for each run in the session history.
      </p>
      <Callout type="info">
        Credits are calculated server-side — the client never decides what to charge. Your balance
        is always accurate and visible in the top-right corner of the dashboard.
      </Callout>

      <h2 id="purchasing" className={styles.h2}>Purchasing credits</h2>
      <p className={styles.p}>
        Go to <strong>Dashboard → Billing → Buy Credits</strong>. Choose a credit package and
        complete the checkout with your card. Credits are added to your account instantly after
        payment is confirmed.
      </p>
      <p className={styles.p}>
        Larger packages come with a discount — buying in bulk is cheaper per credit than buying
        the smallest package repeatedly.
      </p>

      <h2 id="auto-recharge" className={styles.h2}>Auto-recharge</h2>
      <p className={styles.p}>
        Enable auto-recharge so your balance never unexpectedly runs out during a scheduled run.
        Set a <strong>threshold</strong> (the balance level that triggers a top-up) and a
        <strong> recharge amount</strong> (how many credits to add when triggered).
      </p>
      <p className={styles.p}>
        Example: threshold = 500 credits, recharge amount = 2,000 credits. When your balance
        drops below 500, Valendata automatically charges your saved card for 2,000 credits.
      </p>
      <Callout type="warning">Auto-recharge requires a saved payment method. You can manage this in <strong>Settings → Billing</strong>.</Callout>

      <h2 id="plans" className={styles.h2}>Plans</h2>
      <p className={styles.p}>
        Valendata offers a free tier and paid plans. Paid plans include a monthly credit grant
        that refreshes each billing period, plus higher limits on parallel sessions and
        Workflow steps.
      </p>
      <p className={styles.p}>
        Visit the <strong>Pricing</strong> page on the main site for current plan details and
        pricing. You can upgrade or downgrade at any time from <strong>Settings → Plan</strong>.
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const CONTENT_MAP: Record<string, () => React.ReactNode> = {
  intro: () => <IntroContent />,
  skills: () => <SkillsContent />,
  workflows: () => <WorkflowsContent />,
  credits: () => <CreditsContent />,
};

export default function DocsPage() {
  const [active, setActive] = useState('intro');
  const onThisPage = ON_THIS_PAGE[active] || [];
  const Content = CONTENT_MAP[active];

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="https://valendata.com" className={styles.logo}>
          <span className={styles.logoDot} />
          Valendata
        </Link>
        <nav className={styles.topNav}>
          <span className={styles.topNavActive}>Docs</span>
          <a className={styles.topNavLink} href="https://valendata.com">Home</a>
          <a className={styles.topNavLink} href="https://app.valendata.com">Dashboard</a>
        </nav>
        <div className={styles.topRight}>
          <a href="https://app.valendata.com" className={styles.ctaBtn}>Get started →</a>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            {NAV.map(group => (
              <div key={group.section} className={styles.navGroup}>
                <div className={styles.navGroupLabel}>{group.section}</div>
                {group.items.map(item => (
                  <button
                    key={item.id}
                    className={`${styles.navItem} ${active === item.id ? styles.navItemActive : ''}`}
                    onClick={() => setActive(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <main className={styles.main}>
          {Content ? <Content /> : null}
        </main>

        {onThisPage.length > 0 && (
          <aside className={styles.toc}>
            <div className={styles.tocLabel}>On this page</div>
            {onThisPage.map(h => (
              <a key={h.id} href={`#${h.id}`} className={styles.tocItem}>{h.label}</a>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
