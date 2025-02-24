<template>
  <main>
    <BaseHero />
    <BaseSearchBar />

    <section>
      <div class="recipe-piece">
        <div v-for="recipe of recipes" :key="recipe.slug">
          <NuxtLink
            :to="{ name: 'recipes-slug', params: { slug: recipe.slug } }"
          >
            <div
              class="recipe-list-img"
              :style="
                `background: url(${thumbs(recipe.img)}) no-repeat center center`
              "
              :aria-label="recipe.title"
              role="img"
            ></div>
          </NuxtLink>

          <div class="recipe-content">
            <p class="details">
              <IconTime />{{ recipe.time }} minutes
              <span class="rating"><StarRating :rating="recipe.rating"/></span>
            </p>

            <NuxtLink
              :to="{ name: 'recipes-slug', params: { slug: recipe.slug } }"
              ><h3>{{ recipe.title }}</h3></NuxtLink
            >
            <tag-group :tags="recipe.tags"></tag-group>
            <p class="description">{{ recipe.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TagGroup from "../components/global/TagGroup.vue";

export default {
  components: { TagGroup },
  methods: {
    thumbs(src) {
      let thumbSizes = this.$img.getSizes(src, {
        sizes: "xs:100vw sm:100vw md:300px lg:300px",
        modifiers: {
          quality: 70,
          height: 200
        }
      });
      return thumbSizes.src;
    }
  },
  async asyncData({ $content, params }) {
    const recipes = await $content("recipes")
      .only([
        "title",
        "description",
        "img",
        "slug",
        "time",
        "rating",
        "tags",
      ])
      .sortBy("date", 'desc')
      .fetch();

    return {
      recipes
    };
  }
};
</script>

<style scoped>
.recipe-list-img {
  height: 200px;
  border-radius: 5px;
  background-size: cover !important;
  position: relative;
}

.tag-group {
  margin: 10px 0 20px;
}

.recipe-piece {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  text-decoration: none;
}

@media only screen and (max-width: 900px) {
  .recipe-piece {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 650px) {
  .recipe-piece {
    grid-template-columns: repeat(1, 1fr);
  }
}

.recipe-piece a {
  color: black;
  text-decoration: none;
}

h3 {
  margin-top: -15px;
}

.recipe-content {
  padding: 10px 3px 10px;
}

.description {
  margin: 10px 0;
}

.details {
  font-size: 80%;
}

.rating {
  float: right;
}
</style>
