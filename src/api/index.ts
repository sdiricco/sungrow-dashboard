import api from './config';
import {type LoginResponse,type PowerStationResponse} from './interfaces'
import * as constants from '../constants'

export async function login(username:string, password:string){
    return api.post<LoginResponse>('/login', {
        "user_account": username,
        "user_password": password,
        "appkey": constants.APP_KEY
    })
}

export async function getPowerStationList(token: string){
    return api.post<PowerStationResponse>('getPowerStationList', {
        "appkey":constants.APP_KEY,
        "token":token,
        "curPage":1,
        "size":10
    })
}

export async function getDeviceList(token:string, ps_id:string){
    return api.post<any>('getDeviceList', {
        "appkey":constants.APP_KEY,
        "token":token,
        "curPage":1,
        "size":10,
        "ps_id":ps_id,
    })
}

export async function getPowerStationDetail(token: string, sn: string){
    return api.post<any>('getPowerStationDetail', {
        "appkey":constants.APP_KEY,
        "token":token,
        "sn":sn,
        "is_get_ps_remarks": "1"
    })
}

export async function getDeviceListByUser(token:string){
    return api.post<any>('getDeviceListByUser', {
        "appkey":constants.APP_KEY,
        "token":token,
        "curPage":"1",
        "size":"100"
    })
}

