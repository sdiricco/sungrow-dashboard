import api from "./config";
import {
  type DeviceListByUserResponse,
  type LoginResponse,
  type PowerStationDetailsResponse,
  type PowerStationResponse,
} from "./interfaces";
import * as constants from "../constants";

/**
 * Login
 * 
 * @url https://developer-api.isolarcloud.com/#/document/api?id=11606&project_id=2&version=V1
 * 
 * Example return
 * {
 *   "req_serial_num": "20250319606c4982a67f7bd9fcab27b3",
 *   "result_code": "1",
 *   "result_msg": "success",
 *   "result_data": {
 *     "user_master_org_id": "530435",
 *     "mobile_tel": null,
 *     "user_name": null,
 *     "language": "English",
 *     "token": "505120_2a62bd4e737e4e8fabc9caaa97f032c6",
 *     "err_times": "0",
 *     "user_id": "5051201",
 *     "login_state": "1",
 *     "disable_time": null,
 *     "country_name": "Germany",
 *     "user_account": "bwq770s12346t",
 *     "user_master_org_name": "M-wise",
 *     "email": "polana733233@tsderp.com",
 *     "country_id": "50"
 *   }
 * }
 */
export async function login(username: string, password: string) {
  return api.post<LoginResponse>("/login", {
    user_account: username,
    user_password: password,
    appkey: constants.APP_KEY,
  });
}

/**
 * Query a user's plant list information or query the plant list information based on the user's organization ID.
 * If you cannot find the required information, get the ps_id of the plant through this endpoint and call the "real-time plant data endpoint" while passing in the required data measurement point number.
 * 
 * @url https://developer-api.isolarcloud.com/#/document/api?id=11586&project_id=2&version=V1
 * 
 * Example return
 * {
 *   "req_serial_num": "20250319928d40f6869c45c01dae4f7d",
 *   "result_code": "1",
 *   "result_msg": "success",
 *   "result_data": {
 *     "pageList": [
 *       {
 *         "total_energy": {
 *           "unit": "度",
 *           "value": "381.6"
 *         },
 *         "alarm_count": 0,
 *         "latitude": null,
 *         "description": null,
 *         "total_income_update_time": "2024-11-14T16:00:50+08:00",
 *         "valid_flag": 1,
 *         "curr_power": {
 *           "unit": "W",
 *           "value": "358"
 *         },
 *         "ps_fault_status": 3,
 *         "district_name": "东城区",
 *         "co2_reduce_update_time": "2024-11-14T16:00:50+08:00",
 *         "city_name": "北京城区",
 *         "install_date": "2024-11-12 18:19:36",
 *         "build_status": 2,
 *         "today_energy_update_time": "2024-11-14T16:00:50+08:00",
 *         "total_energy_update_time": "2024-11-14T16:00:50+08:00",
 *         "ps_type": 4,
 *         "longitude": null,
 *         "total_capcity_update_time": null,
 *         "equivalent_hour_update_time": "2024-11-14T16:00:50+08:00",
 *         "ps_name": "ad优化器572",
 *         "co2_reduce_total": {
 *           "unit": "千克",
 *           "value": "269.19"
 *         },
 *         "curr_power_update_time": "2024-11-14T16:00:50+08:00",
 *         "today_income": {
 *           "unit": "元",
 *           "value": "95"
 *         },
 *         "grid_connection_status": 0,
 *         "equivalent_hour": {
 *           "unit": "小时",
 *           "value": "23.6"
 *         },
 *         "co2_reduce_total_update_time": "2024-11-14T16:00:50+08:00",
 *         "province_name": "北京市",
 *         "ps_location": "123",
 *         "total_income": {
 *           "unit": "元",
 *           "value": "270"
 *         },
 *         "total_capcity": {
 *           "unit": "kWp",
 *           "value": "4.025"
 *         },
 *         "share_type": "1",
 *         "ps_current_time_zone": "GMT+8",
 *         "today_income_update_time": "2024-11-14T16:00:50+08:00",
 *         "ps_id": 700669565,
 *         "grid_connection_time": null,
 *         "connect_type": 1,
 *         "today_energy": {
 *           "unit": "度",
 *           "value": "95"
 *         },
 *         "ps_status": 1,
 *         "co2_reduce": {
 *           "unit": "千克",
 *           "value": "94.715"
 *         },
 *         "fault_count": 0
 *       }
 *     ],
 *     "rowCount": 1
 *   }
 * }
 */
export async function getPowerStationList(token: string) {
  return api.post<PowerStationResponse>("getPowerStationList", {
    appkey: constants.APP_KEY,
    token: token,
    curPage: 1,
    size: 10,
  });
}

/**
 * Query device list by plant ID.
 * 
 * @url https://developer-api.isolarcloud.com/#/document/api?id=11587&project_id=2&version=V1
 * 
 * Example return
 * {
 *   "req_serial_num": "2025031985a04512b7f2f9907bbc83f8",
 *   "result_code": "1",
 *   "result_msg": "success",
 *   "result_data": {
 *     "pageList": [
 *       {
 *         "chnnl_id": 5,
 *         "type_name": "逆变器",
 *         "ps_key": "689661_1_1_5",
 *         "device_sn": "A2262065536",
 *         "dev_status": "1",
 *         "device_type": 1,
 *         "factory_name": "阳光电源股份有限公司",
 *         "uuid": 3791641,
 *         "grid_connection_date": "2022-09-27 15:42:08",
 *         "device_name": "研发楼NB04",
 *         "dev_fault_status": 4,
 *         "rel_state": 1,
 *         "device_code": 1,
 *         "ps_id": 689661,
 *         "device_model_id": 346856,
 *         "communication_dev_sn": "B2261882811",
 *         "device_model_code": "SG50CX-P2-CN"
 *       },
 *       {
 *         "chnnl_id": 4,
 *         "type_name": "逆变器",
 *         "ps_key": "689661_1_1_4",
 *         "device_sn": "A2271319309",
 *         "dev_status": "1",
 *         "device_type": 1,
 *         "factory_name": "阳光电源股份有限公司",
 *         "uuid": 3785953,
 *         "grid_connection_date": "2022-09-26 16:57:06",
 *         "device_name": "主厂房NB01",
 *         "dev_fault_status": 4,
 *         "rel_state": 1,
 *         "device_code": 1,
 *         "ps_id": 689661,
 *         "device_model_id": 346830,
 *         "communication_dev_sn": "A2262066345",
 *         "device_model_code": "SG110CX-P2-CN"
 *       },
 *       {
 *         "chnnl_id": 3,
 *         "type_name": "逆变器",
 *         "ps_key": "689661_1_1_3",
 *         "device_sn": "A2262065534",
 *         "dev_status": "1",
 *         "device_type": 1,
 *         "factory_name": "阳光电源股份有限公司",
 *         "uuid": 3785890,
 *         "grid_connection_date": "2022-09-26 16:52:06",
 *         "device_name": "主厂房NB03",
 *         "dev_fault_status": 4,
 *         "rel_state": 1,
 *         "device_code": 1,
 *         "ps_id": 689661,
 *         "device_model_id": 346856,
 *         "communication_dev_sn": "B2261882806",
 *         "device_model_code": "SG50CX-P2-CN"
 *       },
 *       {
 *         "chnnl_id": 2,
 *         "type_name": "逆变器",
 *         "ps_key": "689661_1_1_2",
 *         "device_sn": "A2271319217",
 *         "dev_status": "1",
 *         "device_type": 1,
 *         "factory_name": "阳光电源股份有限公司",
 *         "uuid": 3785846,
 *         "grid_connection_date": "2022-09-26 16:47:08",
 *         "device_name": "主厂房NB02",
 *         "dev_fault_status": 4,
 *         "rel_state": 1,
 *         "device_code": 1,
 *         "ps_id": 689661,
 *         "device_model_id": 346830,
 *         "communication_dev_sn": "A2262066334",
 *         "device_model_code": "SG110CX-P2-CN"
 *       },
 *       {
 *         "chnnl_id": 1,
 *         "type_name": "逆变器",
 *         "ps_key": "689661_1_1_1",
 *         "device_sn": "A2271319326",
 *         "dev_status": "1",
 *         "device_type": 1,
 *         "factory_name": "阳光电源股份有限公司",
 *         "uuid": 3785529,
 *         "grid_connection_date": "2022-09-26 16:15:30",
 *         "device_name": "检修楼NB05",
 *         "dev_fault_status": 4,
 *         "rel_state": 1,
 *         "device_code": 1,
 *         "ps_id": 689661,
 *         "device_model_id": 346830,
 *         "communication_dev_sn": "A2262066326",
 *         "device_model_code": "SG110CX-P2-CN"
 *       }
 *     ],
 *     "rowCount": 5
 *   }
 * }
 */
export async function getDeviceList(token: string, ps_id: string) {
  return api.post<any>("getDeviceList", {
    appkey: constants.APP_KEY,
    token: token,
    curPage: 1,
    size: 100,
    ps_id: ps_id,
  });
}

/**
 * Query Basic Plant Info
 * 
 * @url https://developer-api.isolarcloud.com/#/document/api?id=11588&project_id=2&version=V1
 * @param sn Device S/N
 * @param is_get_ps_remarks Get Plant Remarks?: (1: Yes; defaults to no if not passed)
 * 
 * Example return
 * {
 *   "req_serial_num": "2025031962544079921aca8abf7d3870",
 *   "result_code": "1",
 *   "result_msg": "success",
 *   "result_data": {
 *     "design_capacity": 11000,
 *     "alarm_count": 0,
 *     "ps_key": "974621_11_0_0",
 *     "latitude": 33.07597603786331,
 *     "description": null,
 *     "ps_price_kwh": "1",
 *     "ps_fault_status": 3,
 *     "ps_type_name": "户用光伏",
 *     "build_status": 2,
 *     "install_date": "2023-06-13 15:40:56",
 *     "ps_type": 4,
 *     "email": null,
 *     "longitude": 112.60275055975228,
 *     "param_income_unit_name": "元",
 *     "ps_price": "0.001",
 *     "ps_name": "李庚莲11kwB2313140126",
 *     "share_user_type": null,
 *     "ps_location": "河南省南阳市南召县太山庙乡张沟村核西组456号",
 *     "share_type": "0",
 *     "ps_current_time_zone": "GMT+8",
 *     "user_moble_tel": "13037650202",
 *     "ps_id": 974621,
 *     "communication_dev_detail_list": [
 *       {
 *         "is_enable": 1,
 *         "sn": "B2313140126"
 *       }
 *     ],
 *     "connect_type": 1,
 *     "ps_status": 1,
 *     "fault_count": 0
 *   }
 * }
 */
export async function getPowerStationDetail(token: string, sn: string) {
  return api.post<PowerStationDetailsResponse>("getPowerStationDetail", {
    appkey: constants.APP_KEY,
    token: token,
    sn: sn,
  });
}


export async function getDeviceListByUser(token: string) {
  return api.post<DeviceListByUserResponse>("getDeviceListByUser", {
    appkey: constants.APP_KEY,
    token: token,
    curPage: "1",
    size: "100",
  });
}

export async function gerDeviceRealTimeData(token:string, payload: {point_id_list: string [], ps_key_list: string [], device_type: number, sn_list: string []}) {
  return api.post("getDeviceRealTimeData", {
    appkey: constants.APP_KEY,
    token,
    point_id_list: payload.point_id_list,
    ps_key_list: payload.ps_key_list,
    device_type: payload.device_type,
    sn_list: payload.sn_list
  })
}

export async function getPVInverterRealTimeData(token:string, payload: {ps_key_list: string [], sn_list: string []}) {
  return api.post("getPVInverterRealTimeData", {
    appkey: constants.APP_KEY,
    token,
    ps_key_list: payload.ps_key_list,
    sn_list: payload.sn_list
  })
}




