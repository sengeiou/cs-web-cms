<template>
<div class="tool-board-container">
  <el-tabs v-model="activeTab" lazy stretch>
    <el-tab-pane class="tab-panel-container" label="快捷訊息" name="fm">
      <el-input
          placeholder="請輸入標題"
          prefix-icon="el-icon-search"
          v-model="titleSearch"
          @change="handleSearch"
      >
      </el-input>
      <el-collapse v-model="activeItems" accordion>
        <el-collapse-item v-for="(groupItem,idx) in tmpGroup" :key="idx" :title="groupItem.category.name" :name="groupItem.category.id">
          <el-table
              :data="groupItem.items"
              border
              style="width: 100%"
          >
            <el-table-column
                fixed
                prop="title"
                label="標題">
            </el-table-column>
            <el-table-column
                fixed
                prop="content"
                label="內容">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
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
import {apiGetCategoryList, apiGetFastMessageGroup} from "@/api/fast-message";
import {sendSocketMessage} from "@/utils/ws";
import {mapGetters} from "vuex";
import {deepCopy} from "@/utils";

export default {
  name: "ToolBoard",
  created() {
    this.fetchFastMessageGroup()
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
    async fetchFastMessageGroup() {
      try {
        this.loading = true
        const { data } = await apiGetFastMessageGroup()
        this.group = data.listFastMessageGroup.group
        this.tmpGroup = data.listFastMessageGroup.group
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
          room_id: this.activeRoomId,
          content_type: 2,
          content: message
        })
      }
    },
    handleSearch(title) {
      this.tmpGroup = deepCopy(this.group)
      for(let i = 0; i< this.tmpGroup.length; i++){
        this.tmpGroup[i].items = this.tmpGroup[i].items.filter(function (item) {
          return item.title.includes(title)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-board-container {
  width: 100%;
  height: 600px;
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  .tab-panel-container {
    padding: 10px;
  }
}
</style>