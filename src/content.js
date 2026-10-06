// Single source for the page copy that also feeds structured data.
// Keep in sync with the app catalog: s1/Sources/S1Core/Config/Providers.swift

export const SITE = 'https://s1-mac.pages.dev/'
export const REPO = 'https://github.com/Matthew-Eucaristo/s1'
export const BREW = 'brew tap Matthew-Eucaristo/tap && brew trust Matthew-Eucaristo/tap && brew install --cask s1'

export const ROLES = [
  { id: 'judge', name: 'Judge', brain: 'System 1', d: 'A fast decision model checks every step before it runs.' },
  { id: 'reasoner', name: 'Reasoner', brain: 'System 2', d: 'An LLM takes over when the built-in grammar can’t.' },
  { id: 'transcribe', name: 'Transcription', brain: 'Voice in', d: 'Cloud speech-to-text. Off means on-device.' },
  { id: 'speak', name: 'Voice', brain: 'Voice out', d: 'A cloud voice for replies. Off means Apple voices.' },
]

// `sees`: the recommended model for that role reads images.
export const PROVIDERS = [
  { id: 'typesafe', name: 'TypeSafe', logo: 'typesafe.png', tint: '#de54bf', roles: ['judge'], pick: 'Jev' },
  { id: 'opencode', name: 'OpenCode Go', logo: 'opencode.svg', tint: '#1f1f21', roles: ['reasoner'], pick: 'DeepSeek V4.1 Flash' },
  { id: 'openai', name: 'OpenAI', logo: 'openai.svg', tint: '#1f1f21', roles: ['reasoner', 'transcribe', 'speak'], pick: 'GPT-5 mini', sees: ['reasoner'] },
  { id: 'openrouter', name: 'OpenRouter', logo: 'openrouter.svg', tint: '#6466f1', roles: ['reasoner'], pick: 'Gemini 2.5 Flash', sees: ['reasoner'] },
  { id: 'groq', name: 'Groq', logo: 'groq.svg', tint: '#f54f36', roles: ['reasoner', 'transcribe', 'speak'], pick: 'Llama 4 Scout', sees: ['reasoner'] },
  { id: 'gemini', name: 'Google Gemini', logo: 'gemini.svg', tint: '#4285f4', roles: ['reasoner'], pick: 'Gemini 2.5 Flash', sees: ['reasoner'] },
  { id: 'xai', name: 'xAI', logo: 'xai.svg', tint: '#1f1f21', roles: ['reasoner'], pick: 'Grok 4 Fast', sees: ['reasoner'] },
  { id: 'deepseek', name: 'DeepSeek', logo: 'deepseek.svg', tint: '#4d6bfe', roles: ['reasoner'], pick: 'DeepSeek V4.1 Flash' },
  { id: 'liquid', name: 'Liquid AI', logo: 'liquid.svg', tint: '#1f1f21', roles: ['judge'], pick: 'd1', sees: ['judge'] },
  { id: 'cloudflare', name: 'Cloudflare', logo: 'cloudflare.svg', tint: '#f38020', roles: ['judge', 'reasoner'], pick: 'Clef Flash', sees: ['judge', 'reasoner'] },
  { id: 'ollama', name: 'Ollama', logo: 'ollama.svg', tint: '#1f1f21', roles: ['judge', 'reasoner'], pick: 'qwen3-vl', sees: ['judge', 'reasoner'], local: true },
  { id: 'lmstudio', name: 'LM Studio', logo: 'lmstudio.svg', tint: '#4059dc', roles: ['reasoner'], pick: 'any loaded model', local: true },
]

export const FAQ = [
  {
    q: 'What is s1?',
    a: 's1 is a free, open-source, voice-first agent for macOS. You double-tap Shift and say what you want done; s1 operates your apps through the macOS Accessibility API and logs every step it takes, with screenshots when it uses them.',
  },
  {
    q: 'Do I need an AI model or an API key?',
    a: 'No. A deterministic grammar handles everyday commands like opening apps, typing, shortcuts, tabs and media keys with no model at all. Connect a provider when you want a Judge (System 1) that checks each step, or a Reasoner (System 2) for anything new.',
  },
  {
    q: 'Which models and providers does s1 support?',
    a: 'TypeSafe, OpenCode Go, OpenAI, OpenRouter (including Claude), Groq, Google Gemini, xAI, DeepSeek, Liquid AI, Cloudflare Workers AI, Ollama, LM Studio and any OpenAI-compatible server. You pick one model per job: a Judge (System 1), a Reasoner (System 2), and optionally cloud voices. Connecting a provider fills in its recommended model, and you can change it anytime.',
  },
  {
    q: 'Does s1 send my screen to the cloud?',
    a: 'Only if you choose a model that can read images. Screenshots go to the Judge when it can see, otherwise to the Reasoner when a step needs it; with neither, s1 works from the accessibility tree alone. One switch turns screen sharing off entirely.',
  },
  {
    q: 'Is it safe to let an agent use my Mac?',
    a: 'Every action passes a safety gate first. Typing into password fields, purchases, credentials and anything irreversible stop and wait for you, and the Judge can only add caution, never remove it. You can interrupt any run by talking over it or pressing Stop.',
  },
  {
    q: 'Does voice work offline and in my language?',
    a: 'Speech recognition runs on your Mac with Apple’s on-device speech engine in 14 languages. English and Indonesian are verified end to end, and commands the grammar doesn’t know go to your Reasoner, which reads any language.',
  },
  {
    q: 'What are System 1 and System 2?',
    a: 'They are the two models s1 can use. System 1 is the Judge: a small, fast decision model that checks every step before it runs. System 2 is the Reasoner: an LLM that takes over when a command is new. Both are optional; without them, the built-in grammar handles everyday commands on its own.',
  },
  {
    q: 'Can I change the defaults, or extend s1?',
    a: 'Yes. s1 starts with sensible defaults, and every one of them is a setting: models, screen vision, voices, the accent color. Models also live in ~/.s1/config.json and the s1 command line. You can point it at any OpenAI-compatible server, write your own Judge or Reasoner in Swift, save skills by voice, and drive it from Shortcuts. A plugin system is on the roadmap.',
  },
  {
    q: 'What do I need to run it?',
    a: 'A Mac with Apple silicon on macOS 26 or later. Install with Homebrew or download the app from GitHub Releases; the s1 command-line tool comes in the same package.',
  },
]
