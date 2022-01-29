export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Moreau's recipes",
    htmlAttrs: {
      lang: "fr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cloud.typography.com/7626114/6654772/css/fonts.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Nuxt Content
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Nuxt Image
  buildModules: ["@nuxt/image"],

  // Nuxt Image config
  image: {
    // Generate images to `/_nuxt/image/file.png`
    // credit to @bencodezen for the concept: https://github.com/bencodezen/simple-nuxt-image-demo/blob/main/nuxt.config.js
    staticFilename: "[publicPath]/images/[name]-[hash][ext]"
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  hooks: {
    // Doc: https://content.nuxtjs.org/advanced#contentfilebeforeinsert
    "content:file:beforeInsert": async (document, database) => {
      // search for markdown containing
      // only `specialNotice` property.
      if (document.extension === ".md" && document.instructions) {
        // Replace Markdown string in database
        // with the JSON ATS version
        document.instructions = await Promise.all(document.instructions.map(async (instruction) => ({
          ...instruction,
          description: await database.markdown.toJSON(
            instruction.description
          ),
          steps: await Promise.all(instruction.steps.map(async (step) => ({
            ...step,
            description: await database.markdown.toJSON(
              instruction.description
            ),
          })))
        })))
      }
    }
  }
};
