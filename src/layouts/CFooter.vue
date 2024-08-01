<script setup>
import { FacebookIcon } from "@/assets/icons/facebook";
import { InstagramIcon } from "@/assets/icons/instagram";
import { TelegramIcon } from "@/assets/icons/telegram";

const datas = [
  {
    title: "Biz haqimizda",
    link: "#",
  },
  {
    title: "About",
    link: "Foydalanuvchi roziliklari",
  },
  {
    title: "Murojat uchun",
    link: "#",
  },
  {
    title: "Savol va jabvoblar",
    link: "#",
  },
  {
    title: "Hamkorlik uchun ariza",
    link: "#",
  },
];
</script>
<template>
  <div class="footer container">
    <div>
      <h2>© {{ new Date().getFullYear() }} Express 24</h2>
      <div class="socials">
        <TelegramIcon />
        <FacebookIcon />
        <InstagramIcon />
      </div>
    </div>
    <ul class="links">
      <li class="link" v-for="data in datas" :key="data.title">
        <a :href="data.link">{{ data.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.footer {
  background: $footer-bg;
  padding: 4rem 0;
  display: flex;
  flex-wrap: wrap;
  color: $white;
  gap: 3rem;
  .socials {
    color: $white;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  .links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 2rem;
    height: max-content;
    width: max-content;
    .link {
      list-style: none;
      a {
        color: $white;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
