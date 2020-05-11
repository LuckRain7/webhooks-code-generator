<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-05-10 22:18:01
 -->

<template>
  <div class="Build">
    <back></back>
    <!-- 标题 -->
    <div class="title">
      新建 webhooks 服务器代码
    </div>
    <!-- 步骤条 -->
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <!-- 内容 -->
    <div class="steps-content-bg">
      <!-- 表单 1 -->
      <transition enter-active-class="fadeInLeft">
        <div v-if="current === 0" class="from-content">
          <a-form
            :form="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            @submit="handleSubmit"
          >
            <a-form-item label="校验秘钥">
              <a-input
                v-decorator="[
                  'secret',
                  {
                    rules: [{ required: true, message: '请填写校验秘钥!' }],
                  },
                ]"
                placeholder="填写协商校验秘钥"
              />
            </a-form-item>

            <a-form-item label="项目文件地址">
              <a-input
                v-decorator="[
                  'file',
                  {
                    rules: [{ required: true, message: '请填写项目文件地址!' }],
                  },
                ]"
                placeholder="填写在服务器上的项目地址"
              />
            </a-form-item>

            <a-form-item label="CMD命令">
              <a-input
                v-decorator="[
                  'cmd',
                  {
                    rules: [{ required: true, message: '请填写CMD命令' }],
                  },
                ]"
                placeholder="填写进入项目后执行的命令 用 & 进行分割"
              />
            </a-form-item>

            <a-form-item label="接受请求地址">
              <a-input
                v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: '请填写接受请求地址' }],
                  },
                ]"
                placeholder="填写接受请求地址"
              />
            </a-form-item>

            <a-form-item label="端口号">
              <a-input
                v-decorator="[
                  'port',
                  {
                    rules: [{ required: true, message: '请填写端口号' }],
                  },
                ]"
                placeholder="填写端口号"
              />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">
                确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </transition>
      <!-- 代码显示 2 -->
      <transition enter-active-class=" fadeInLeft">
        <!-- <transition name="test"> -->
        <div v-if="current === 1" class="download ">
          <div class="download-title">
            文件已生成 请点击下载
          </div>
          <a-button type="primary" @click="download"> {{ code }}↓ </a-button>
        </div>
      </transition>
      <!-- 服务器构建 -->
      <transition enter-active-class="fadeInLeft">
        <div v-if="current === 2" class="server ">
          <p>将代码在服务器端进行解压</p>
          <p>解压后进入文件夹</p>
          <p>命令行执行 <span class="red">npm install</span> 安装依赖</p>
          <p>命令行执行 <span class="red">node index.js</span> 启动服务</p>
          <a-button style="margin-left: 8px" @click="back">
            跳回首页
          </a-button>
        </div>
      </transition>
    </div>
    <!-- 按钮 -->
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>
<script>
import Back from "@/components/common/Back.vue";
import axios from "axios";
import ejs from "ejs";
export default {
  layout: "basic",
  components: {
    Back,
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      current: 0,
      code: null,
      steps: [
        {
          title: "填写信息",
          content: "First-content",
        },
        {
          title: "生成代码",
          content: "Second-content",
        },
        {
          title: "在服务器构建",
          content: "Last-content",
        },
      ],
    };
  },
  methods: {
    next() {
      this.current++;
    },
    back() {
      this.$router.push("/");
    },
    prev() {
      this.current--;
    },
    funDownload(content, filename) {
      var eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { data } = await axios.get("/template/new.ejs"); // 获取模板字符
          const res = ejs.render(data, values); // 使用模板进行整合

          // let formData = new FormData();
          // formData.append("chunk", res);
          // formData.append("filename", "index.js");
          this.funDownload(res, "index.js");

          this.code = res;
          this.current++;
        }
      });
    },
    download() {
      //  下载文件
      window.open(`/${this.code}`);
      this.current++;
    },
  },
};
</script>
<style scoped lang="scss">
.Build {
  width: 80%;
  margin: 30px auto;

  .title {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    text-align: center;
    margin-bottom: 30px;
  }

  // 内容背景
  .steps-content-bg {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 450px;

    .from-content {
      width: 700px;

      margin: 40px auto;
    }

    // 文件下载
    .download {
      width: 300px;
      margin: 40px auto;
      text-align: center;

      .download-title {
        font-size: 20px;
        margin: 40px auto;
      }
    }

    .server {
      width: 400px;
      margin: 40px auto;

      p {
        font-size: 20px;
      }

      button {
        margin-top: 40px;
        float: right;
        margin-right: 20px;
      }
    }
  }

  .steps-action {
    margin-top: 24px;
  }
}
.red {
  color: red;
}
</style>
