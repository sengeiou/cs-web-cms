<template>
  <AppDialog ref="dialog" title="確定要結束嗎?" width="500px">
    <div slot="body">
      <el-form
          ref="dialogForm"
          :model="formData"
          :rules="rules"
          label-width="80px"
      >
        <el-form-item label="標籤:" prop="tagId">
          <el-select v-model="formData.tagId" placeholder="請選擇">
            <el-option
                v-for="(tag,idx) in tags"
                :key="idx"
                :label="tag.name"
                :value="tag.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" plain @click="handleCancel"> 取消 </el-button>
      <el-button type="primary" @click="submitForm"> 確認 </el-button>
    </div>
  </AppDialog>
</template>

<script>
import AppDialog from '@/components/AppDialog'
import { deepCopy } from '@/utils'
import {apiCloseRoom} from "@/api/room";
import {apiGetTagList} from "@/api/tag";
import {mapGetters} from "vuex";

export default {
  name: 'CloseRoomDialog',
  components: {
    AppDialog
  },
  computed: {
    ...mapGetters({
      activeRoomId: 'cs/activeRoomId',
      activeTab: 'cs/activeTab',
    }),
  },
  created() {
    this.fetchTags()
  },
  data() {
    return {
      tagID: 0,
      tags: [],
      initialFormData: {
        tagId: null
      },
      formData: {
        tagId: null
      },
      rules: {
        tagId: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  methods: {
    show() {
      this.formData = deepCopy(this.initialFormData)
      this.$refs.dialog.show()
    },
    handleCancel() {
      this.$refs.dialog.hide()
    },
    submitForm() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.$refs.dialog.toggleLoadingFullScreen()
          try {
            await apiCloseRoom({
              input: {
                id: this.activeRoomId,
                tagID: this.formData.tagId
              }
            })
            this.$store.commit("cs/RESET")
            await this.fetchRoomList()
            this.$showSuccessMessage("操作成功", this.afterSubmit)
          } catch (error) {
            this.$refs.dialog.toggleLoadingFullScreen()
          }
        }
      })
    },
    afterSubmit() {
      this.$refs.dialog.afterSubmit()
    },
    async fetchTags() {
      try {
        this.loading = true
        const { data } = await apiGetTagList({
          filter: {
            name: "",
            status: "Enabled",
          },
          pagination: {
            page: 1,
            pageSize: 1000
          }
        })
        this.tags = data.listTag.tags
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async fetchRoomList() {
      await this.$store.dispatch("cs/getStaffRoomList", {
        filter: {
          status: this.activeTab
        },
        pagination: {
          page: 1,
          pageSize: 10
        }
      })
    }
  }
}
</script>
