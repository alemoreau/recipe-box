<template>
  <main class="single">
    <div class="titlearea">
      <p class="date">{{ formatDate(recipe.createdAt) }}</p>
      <h1 class="recipe-title">{{ recipe.title }}</h1>
      <div class="single-details">
        <div class="time">
          <IconTime />
          {{ recipe.time }} minutes
        </div>
        <div class="rating">
          <StarRating :rating="recipe.rating" />
        </div>
        <author :author="recipe.author" class="details-author" />
      </div>
      <p class="description">{{ recipe.description }}</p>
      <TagGroup :tags="recipe.tags" />
    </div>

    <div
      class="photo"
      :style="
        `background: url(${formatImg(recipe.img)}) no-repeat center center`
      "
      :aria-label="recipe.title"
      role="img"
    ></div>

    <nav class="internal-nav">
      <div class="ingredients panel">
        <h4>Ingredients</h4>
        <ul>
          <li
            v-for="ingredient of recipe.ingredients"
            :key="ingredient.name"
          >{{ ingredient.name }} {{ ingredient.quantity }}</li>
        </ul>
      </div>
      <div class="ustensils panel">
        <h4>Ustensiles</h4>
        <ul>
          <li v-for="ustensil of recipe.ustensils" :key="ustensil.name">{{ ustensil.name }}</li>
        </ul>
      </div>
      <div class="instructions panel">
        <h4>Instructions</h4>
        <ul>
          <li v-for="link of recipe.toc" :key="link.id">
            <NuxtLink :to="`#${link.id}`">
              <IconLink />
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <article>
      <!-- <section v-for="instruction of recipe.instructions" :key="instruction.name">
        <h4>{{ instruction.name }}</h4>
        <NuxtContent :document="instruction.description" />
        <ul>
          <li v-for="step of instruction.steps" :key="instruction.name + step.name">
            <h5>{{ step.name }}</h5>
            <NuxtContent :document="step.description" />
          </li>
        </ul>
      </section> -->
      <NuxtContent :document="recipe" />
      <BasePrevNext :prev="prev" :next="next" />
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const recipe = await $content("recipes", params.slug).fetch();
    if (recipe.author) {
      try {
        recipe.author = await $content("authors", recipe.author).fetch();
      } catch (error) {
        console.error("author", recipe.author, "does not exist")
      }
    }
    const [prev, next] = await $content("recipes")
      .only(["title", "slug"])
      .sortBy("createdAt", "asc")
      .surround(params.slug)
      .fetch();

    return { recipe, prev, next };
  },
  methods: {
    formatImg(src) {
      const sizes = this.$img.getSizes(src, {
        sizes: "xs:100vw sm:100vw md:50vw lg:50vw",
        modifiers: {
          quality: 70,
          height: 500
        }
      });
      return sizes.src;
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    }
  }
};
</script>

<style>
/* new */
main.single {
  width: calc(100vw - 8vw);
  display: grid;
  grid-template-columns: 1fr 1.5fr 3fr;
  grid-template-rows: 500px 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 60px;
  margin-left: 8vw;
}

h1.recipe-title {
  font-size: 45px;
}

.titlearea {
  grid-area: 1 / 1 / 2 / 3;
  padding: 100px 100px 0 0;
}

.photo {
  grid-area: 1 / 3 / 2 / 4;
  background-size: cover !important;
}

article {
  grid-area: 2 / 2 / 3 / 4;
}

.nuxt-content {
  max-width: 50vw;
  margin-top: -20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 30px;
}

.internal-nav {
  grid-area: 2 / 1 / 3 / 2;
  border-top: 4px solid black;
  padding-top: 10px;
}

@media only screen and (max-width: 1100px) {
  main.single {
    width: calc(100vw - 10vw);
    margin-left: 5vw;
  }

  .titlearea {
    grid-area: 1 / 1 / 2 / 3;
    padding: 50px 50px 0 0;
  }

  h1.recipe-title {
    font-size: 30px;
  }
}

@media only screen and (max-width: 750px) {
  main.single {
    display: block;
  }

  .photo {
    height: 300px;
  }

  .titlearea {
    height: auto;
  }

  .tag-group {
    margin-bottom: 20px;
  }

  article {
    margin-top: 40px;
  }

  .nuxt-content {
    width: 100%;
    margin-top: 0;
  }

  .panel {
    margin-top: 20px;
  }
}

.date {
  text-transform: uppercase;
}

.single-details {
  margin: 20px 0;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
}

.time {
  font-size: 14px;
}

.details-author {
  margin-top: -10px;
}

.rating {
  margin-left: -10px;
}

.panel h4 {
  padding: 8px;
}

.panel ul {
  padding-left: 0;
}

.panel li {
  border-top: 1px solid grey;
  padding: 8px;
  list-style: none;
  font-size: 15px;
}

.panel a {
  text-decoration: none;
  color: black;
}

.description {
  margin-bottom: 20px;
}

.nuxt-content h1 {
  font-size: 28px;
  margin: 20px 0;
}

.nuxt-content h2 {
  font-size: 28px;
  margin: 15px 0;
}

.nuxt-content h3 {
  font-size: 22px;
  margin: 10px 0;
}

.nuxt-content p {
  margin-bottom: 20px;
}

.link {
  margin-right: 5px;
}

.nuxt-content li {
  margin-bottom: 5px;
}

.icon.icon-link {
  background-image: url("~assets/hashtag2.svg");
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
