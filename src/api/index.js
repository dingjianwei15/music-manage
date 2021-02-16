// eslint-disable-next-line no-unused-vars
import {get, post, postJsonRequest} from './http'

/************************登录管理***************************/
// 判断管理员是否登录成功
export const getLoginStatus = (params) => post(`admin/login/status`, params)

/************************歌手管理***************************/
//新增歌手
export const addSinger = (params) => post(`singer/addSinger`,params)
//查询歌手
export const querySingers = (params) => post('singer/querySingers',params)
//更新歌手
export const updateSinger = (params) => post('singer/updateSinger',params)
//删除歌手
export const deleteSinger = (params) => post('/singer/deleteSinger',params)
