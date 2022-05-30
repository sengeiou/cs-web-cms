const permissionKeys = {
	"CsSystem": "客服系統",
	"CsSetting": "客服設置",
	"ListTag": "標籤列表",
	"ListFastReply": "快捷訊息列表",
	"ListNotice": "通知列表",
	"GetCsConfig": "參數配置",
	"HistoryRecord": "歷史紀錄",
	"ListRoom": "諮詢房列表",
	"ListMessage": "訊息列表",
	"Report": "報表管理",
	"DailyTagReport": "諮詢類型報表",
	"DailyGuestReport": "訪客數報表",
	"CMS": "後台管理",
	"ListRemind": "提醒列表",
	"Staff": "職員管理",
	"ListStaff": "職員列表",
	"ListRole": "角色列表",
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
				id: "ListTag",
				label: "標籤列表",
			},
			{
				id: "ListFastReply",
				label: "快捷訊息列表",
			},
			{
				id: "ListNotice",
				label: "通知列表",
			},
			{
				id: "GetCsConfig",
				label: "參數配置",
			},
		],
	},
	{
		id: "HistoryRecord",
		label: "歷史紀錄",
		children: [
			{
				id: "ListRoom",
				label: "諮詢房列表",
			},
			{
				id: "ListMessage",
				label: "訊息列表",
			},
		]
	},
	{
		id: "Report",
		label: "報表管理",
		children: [
			{
				id: "DailyTagReport",
				label: "諮詢類型報表",
			},
			{
				id: "DailyGuestReport",
				label: "訪客數報表",
			},
		]
	},
	{
		id: "CMS",
		label: "後台管理",
		children: [
			{
				id: "ListRemind",
				label: "提醒列表",
			},
		]
	},
	{
		id: "Staff",
		label: "報表管理",
		children: [
			{
				id: "ListStaff",
				label: "職員列表",
			},
			{
				id: "ListRole",
				label: "角色列表",
			},
		]
	},
]
