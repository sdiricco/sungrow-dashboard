export type LoginResponse = {
  req_serial_num: string;
  result_code: string;
  result_msg: string;
  result_data: LoginResultData;
};

export type LoginResultData = {
  user_master_org_id: string;
  mobile_tel: string | null;
  user_name: string;
  language: string;
  token: string;
  err_times: string;
  user_id: string;
  login_state: string;
  disable_time: string | null;
  country_name: string;
  user_account: string;
  user_master_org_name: string;
  email: string;
  country_id: string;
};

export type PowerStationResponse = {
  req_serial_num: string;
  result_code: string;
  result_msg: string;
  result_data: PowerStationResultData;
};

export type PowerStationResultData = {
  pageList: PowerStation[];
  rowCount: number;
};

export type PowerStation = {
  total_energy: {
    unit: string;
    value: string;
  };
  alarm_count: number;
  latitude: number;
  description: string | null;
  total_income_update_time: string;
  valid_flag: number;
  curr_power: {
    unit: string;
    value: string;
  };
  ps_fault_status: number;
  co2_reduce_update_time: string;
  install_date: string;
  build_status: number;
  today_energy_update_time: string;
  total_energy_update_time: string;
  ps_type: number;
  longitude: number;
  total_capcity_update_time: string;
  equivalent_hour_update_time: string;
  ps_name: string;
  co2_reduce_total: {
    unit: string;
    value: string;
  };
  curr_power_update_time: string;
  today_income: {
    unit: string;
    value: string;
  };
  grid_connection_status: number;
  equivalent_hour: {
    unit: string;
    value: string;
  };
  co2_reduce_total_update_time: string;
  ps_location: string;
  total_income: {
    unit: string;
    value: string;
  };
  total_capcity: {
    unit: string;
    value: string;
  };
  share_type: string;
  ps_current_time_zone: string;
  today_income_update_time: string;
  ps_id: string;
  grid_connection_time: string | null;
  connect_type: number;
  today_energy: {
    unit: string;
    value: string;
  };
  ps_status: number;
  co2_reduce: {
    unit: string;
    value: string;
  };
  fault_count: number;
};
