<template>
<div class="tool-board-container">
  <el-tabs v-model="activeTab" lazy stretch>
    <el-tab-pane class="tab-panel-container" label="快捷訊息" name="fm">
      <el-input
          placeholder="請輸入標題"
          prefix-icon="el-icon-search"
          style="margin-bottom: 20px;"
          v-model="titleSearch"
          @change="handleSearch"
      >
      </el-input>
      <el-collapse class="group-collapse" v-if="tmpGroup.length > 0" v-model="activeItems">
        <el-collapse-item v-for="(groupItem,idx) in tmpGroup" :key="idx" :title="groupItem.category.name" :name="groupItem.category.id">
          <el-table
              :data="groupItem.items"
              border
              style="width: 100%;border-radius: 8px;"
              :cell-style="{padding:'7px'}"
              :header-cell-style="{padding:'5px'}"
          >
            <el-table-column
              fixed
              prop="title"
              label="標題"
              width="100"
            >
            </el-table-column>
            <el-table-column
              fixed
              prop="content"
              label="內容"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="90"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleSend(scope.row.content)">發送</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import {apiGetFastReplyGroup} from "@/api/fast-reply";
import {sendSocketMessage} from "@/utils/ws";
import {mapGetters} from "vuex";
import {deepCopy} from "@/utils";

export default {
  name: "ToolBoard",
  created() {
    this.fetchFastReplyGroup()
  },
  computed: {
    ...mapGetters({
      activeRoomId: 'cs/activeRoomId',
    }),
  },
  data() {
    return {
      activeTab: "fm",
      activeItems: ['1'],
      group: [],
      tmpGroup: [],
      titleSearch: '',
    }
  },
  methods: {
    async fetchFastReplyGroup() {
      try {
        this.loading = true
        const { data } = await apiGetFastReplyGroup()
        this.group = data
        this.tmpGroup = data
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    handleSend(message) {
      message = message.trim()
      message = message.replace(/\r\n|\n/g,"");
      if(message !== "" && this.activeRoomId !== "") {
        sendSocketMessage({
          op_type: 2,
          room_id: this.activeRoomId,
          content_type: 1,
          content: message,
        })
      }
    },
    handleSearch(title) {
      this.tmpGroup = deepCopy(this.group)
      for(let i = 0; i < this.tmpGroup.length; i++){
        this.tmpGroup[i].items = this.tmpGroup[i].items.filter(function (item) {
          return item.title.includes(title)
        })
      }
      for(let i = 0; i < this.tmpGroup.length; i++){
        this.tmpGroup[i].items = this.tmpGroup[i].items.filter(function (item) {
          return item.title.includes(title)
        })
      }
      this.tmpGroup = this.tmpGroup.filter(function (group) {
        return group.items.length > 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-board-container {
  width: 100%;
  height: 90vh;
  border-radius: 6px;
  background-color: white;
  .tab-panel-container {
    padding: 10px 20px;
    overflow-y: scroll;
    .group-collapse {
      ::v-deep .el-collapse-item__header {
        padding-left: 10px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
      }
    }
  }
}
::v-deep .el-tabs {
  ::v-deep .el-tabs__header {
    ::v-deep .el-tabs__item {
      padding: 0 !important;
    }
  }
}
</style>