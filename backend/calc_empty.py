
# SQLで複数人のユーザのstart_timeとend_timeが渡されることが想定
# 最初のstart_timeの時間を基準に検索をかける
# 帰ってくるのは、最も空き時間が重なっている時間　datetime.datetime(2017, 10, 10, 10, 0) が帰ってきた場合 10~11時が空いている
# sample input
# 
# user1:start_time[datetime.datetime(2017, 10, 10, 0, 0), datetime.datetime(2017, 10, 10, 8, 0)]
# end_time[datetime.datetime(2017, 10, 10, 3, 0), datetime.datetime(2017, 10, 10, 10, 0)]
# user1 start_time end_time
# user2 start_time end_time
test_input={
  "user1": {
    "xxx_times": [
      {
        "starts_at": '1539097200',
        "ends_at": '1539126000',
      },
      {
        "starts_at": '1539133200',
        "ends_at": '1539162000',
      }
    ]
  },
  "user2": {
    "xxx_times": [
      {
        "starts_at": '1539115200',
        "ends_at": '1539118800',
      },
      {
        "starts_at": '1539136800',
        "ends_at": '1539154800',
      }
    ]
  },
    "user3": {
    "xxx_times": [
      {
        "starts_at": '1539174600',
        "ends_at": '1539181800',
      },
      {
        "starts_at": '1539138600',
        "ends_at": '1539162000',
      }
    ]
  }
}

import datetime
import time
import random


def days_to_hours(td):
    return int(td.total_seconds()/3600)

def days_to_half_hours(td):
    return int(td.total_seconds()/1800)

def list_num_to_time(work_start_time,hours_num):
    time = work_start_time + datetime.timedelta(hours=hours_num)
    return time

def min_sec_zero(unix_time):
    unix_time = unix_time.replace(minute = 0,second = 0,microsecond = 0)
    return unix_time

def calc_empty_schedule_humans(input_dict):
    starts_at_arrays = []
    ends_at_arrays = []
    for user_key in input_dict.keys():
        for times_key in input_dict[user_key]["xxx_times"]:
            starts_at = datetime.datetime.fromtimestamp(int(times_key["starts_at"]))
            ends_at = datetime.datetime.fromtimestamp(int(times_key["ends_at"]))
            starts_at_arrays.append(starts_at)
            ends_at_arrays.append(ends_at)
    print(starts_at_arrays)
    print(ends_at_arrays)
    user_a_s = starts_at_arrays
    user_a_e = ends_at_arrays

    #全ての入隊室を最初のを基準に時間のリストとする
    work_start_time = user_a_s[0]
    #検索期間の設定
    search_period  =datetime.timedelta(days=1)
    end =work_start_time+search_period
    hours=int(days_to_half_hours(search_period))

    user_a_s_int_arrays =[]
    user_a_e_int_arrays =[]

    for i in user_a_s:
        temp = days_to_half_hours(i- work_start_time)
        user_a_s_int_arrays.append(temp)
    for i in user_a_e:
        temp = days_to_half_hours(i-work_start_time)
        user_a_e_int_arrays.append(temp)
    # print(user_a_e_int_arrays)
    #ismo
    table = [0]*hours
    human_num = len(user_a_s)

    for i in range(len(user_a_s)):
        table[user_a_s_int_arrays[i]]+=1
        table[user_a_e_int_arrays[i]]-=1

    for i in range(hours):
        if 0 < i:
            table[i]+= table[i-1]
    # print(table)#30分の隙間で見ている、１時間でみるなら
    max_indexes =[i for i, v in enumerate(table) if v == max(table)]
    max_times = []
    for i in max_indexes:
        max_times.append(list_num_to_time(work_start_time,i*0.5))
    # print(max_times)
    if not max_times:
        print(0)
        exit()
    else:
        matching_time = max_times[0]

    matching_users = []
    for user_key in input_dict.keys():
        for times_key in input_dict[user_key]["xxx_times"]:
            
            starts_at = datetime.datetime.fromtimestamp(int(times_key["starts_at"]))
            ends_at = datetime.datetime.fromtimestamp(int(times_key["ends_at"]))
            if  starts_at <= matching_time < ends_at:
                matching_users.append(user_key)
    matching_users = random.sample(matching_users, 2)
    
    print(matching_users)
    print(matching_time)
    matching_time =int(matching_time.timestamp())
    return matching_users,matching_time

matching_users,matching_time = calc_empty_schedule_humans(test_input)
print(type(matching_users),type(matching_time))
print(matching_users,matching_time)
# 実行結果
# <class 'list'> <class 'int'>
# ['user1', 'user3'] 1539138600