<template>
  <div class="app-container" v-loading.fullscreen.lock="loading">
    <AppPanel title="參數配置" :hasFilter="false">
      <template v-slot:body>
        <el-form
            ref="dialogForm"
            :model="form"
            :rules="rules"
            label-width="130px"
            label-position="left"
        >
          <el-form-item label="服務上限人數:" prop="maxMember">
            <el-input
                v-model="form.maxMember"
                style="width: 140px"
            >
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="用戶閒置時間:" prop="memberPendingExpire">
            <el-input
                v-model="form.memberPendingExpire"
                style="width: 140px"
            >
              <template slot="append">分鐘</template>
            </el-input>
          </el-form-item>
          <el-form-item label="問候語:" prop="greetingText">
            <el-input
                type="textarea"
                v-model="form.greetingText"
                style="width: 300px"
                rows="5"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </template>
    </AppPanel>
  </div>
</template>

<script>
import AppPanel from '@/components/AppPanel'
import {apiGetCsConfig, apiUpdateCsConfig} from "@/api/cs-config";

export default {
  name: 'ConfigSetting',
  components: {
    AppPanel,
  },
  data() {
    return {
      testNumber: 1000000,
      loading: false,
      form: {
        maxMember: 0,
        memberPendingExpire: 0,
        greetingText: "",
      },
      rules: {
        maxMember: [{ required: true, message: '必填', trigger: 'blur' }],
        memberPendingExpire: [{ required: true, message: '必填', trigger: 'blur' }],
        greetingText: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submitForm() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await apiUpdateCsConfig({input: this.form})
            this.$showSuccessMessage("保存成功")
            await this.fetchData()
            this.loading = false
          } catch (err) {
            console.log(err)
            this.loading = false
          }
        }
      })
    },
    async fetchData() {
      try {
        this.loading = true
        const { data } = await apiGetCsConfig()
        this.form = {...data.getCsConfig.config}
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
}
</style>
