<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-05-10 22:00:24
 -->
<template>
  <div class="home">
    <div>
      <h1 class="title">
        欢迎使用 webhooks 代码生成器
      </h1>
      <h2 class="subtitle">
        webhooks-code-generator
      </h2>
      <div class="links">
        <router-link :to="{ path: '/New' }" class="button--green">
          新建 webhooks 服务器代码
        </router-link>
        <router-link :to="{ path: '/Add' }" class="button--grey">
          增加 webhooks 服务器端代码
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style lang="scss">
.home {
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
    margin-bottom: 70px;
    word-spacing: 1px;
  }

  .links {
    padding-top: 15px;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
}
</style>
