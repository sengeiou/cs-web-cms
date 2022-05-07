const permissionKeys = {
	"CsSystem": "客服系統",
	"CsSetting": "客服設置",
	"CsSetting.TagList": "標籤列表",
	"CsSetting.FastMessageList": "快捷訊息列表",
	"CsSetting.ConfigSetting": "參數配置",
	"HistoryRecord": "歷史紀錄",
	"HistoryRecord.RoomList": "諮詢房列表",
	"HistoryRecord.MessageList": "訊息列表",
	"Report": "報表管理",
	"Report.DailyTagReport": "諮詢類型報表",
	"Report.DailyGuestReport": "訪客數報表",
	"Staff": "職員管理",
	"Staff.StaffList": "職員列表",
	"Staff.RoleList": "角色列表",
}

export const getPermissionKeys = () => {
	return Object.keys(permissionKeys)
}

export const permissionTree = [
	{
		id: "CsSystem",
		label: "客服系統",
	},
	{
		id: "CsSetting",
		label: "客服設置",
		children: [
			{
				id: "CsSetting.TagList",
				label: "標籤列表",
			},
			{
				id: "CsSetting.FastMessageList",
				label: "快捷訊息列表",
			},
			{
				id: "CsSetting.ConfigSetting",
				label: "參數配置",
			},
		],
	},
	{
		id: "HistoryRecord",
		label: "歷史紀錄",
		children: [
			{
				id: "HistoryRecord.RoomList",
				label: "諮詢房列表",
			},
			{
				id: "HistoryRecord.MessageList",
				label: "訊息列表",
			},
		]
	},
	{
		id: "Report",
		label: "報表管理",
		children: [
			{
				id: "Report.DailyTagReport",
				label: "諮詢類型報表",
			},
			{
				id: "Report.DailyGuestReport",
				label: "訪客數報表",
			},
		]
	},
	{
		id: "Staff",
		label: "報表管理",
		children: [
			{
				id: "Staff.StaffList",
				label: "職員列表",
			},
			{
				id: "Staff.RoleList",
				label: "角色列表",
			},
		]
	},
]
