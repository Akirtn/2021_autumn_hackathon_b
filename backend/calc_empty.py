
# SQLで複数人のユーザのstart_timeとend_timeが渡されることが想定
# 最初のstart_timeの時間を基準に検索をかける
# 帰ってくるのは、最も空き時間が重なっている時間　datetime.datetime(2017, 10, 10, 10, 0) が帰ってきた場合 10~11時が空いている
# sample input
# 
# user1:start_time[datetime.datetime(2017, 10, 10, 0, 0), datetime.datetime(2017, 10, 10, 8, 0)]
# end_time[datetime.datetime(2017, 10, 10, 3, 0), datetime.datetime(2017, 10, 10, 10, 0)]
# user1 start_time end_time
# user2 start_time end_time
base_user_id = "user1"
human_num = 2
test_input={
  "user1": {
    "xxx_times": [
      {
        "starts_at": '1539097800',
        "ends_at": '1539126000',
      },
      {
        "starts_at": '1539133400',
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

def my_index(l, x, default=False):
  if x==2:
      if x in l:
          return l.index(x)
      else:
        return default
  elif x >2:
      for i in range (2,x+1):
          if i in l:
              return l.index(i)
  else:
      return default


def days_to_hours(td):
    return int(td.total_seconds()/3600)

def days_to_half_hours(td,time_span,hour):
    return int(td.total_seconds()/(time_span*hour))

def list_num_to_time(work_start_time,hours_num):
    time = work_start_time + datetime.timedelta(hours=hours_num)
    return time

def min_sec_zero(unix_time):
    unix_time = unix_time.replace(minute = 0,second = 0,microsecond = 0)
    return unix_time

def convert_start_end_time_to_span(start_at,end_at,time_span=30):
    if start_at.minute <= 30:
        start_at = start_at.replace(minute = 30,second = 0,microsecond = 0)
    elif start_at.minute <= 59:
        start_at = start_at.replace(minute = 0,second = 0,microsecond = 0)
        start_at = start_at + datetime.timedelta(hours=1)
    if end_at.minute <= 30:
        start_at = start_at.replace(minute = 0,second = 0,microsecond = 0)
    elif end_at.minute <= 59:
        start_at = start_at.replace(minute = 30,second = 0,microsecond = 0)
    return start_at,end_at

def convert_start_end_time_to_span_rev(start_at,end_at,time_span=30):
    hour =60
    for_num = hour/(time_span)
    for i in range (for_num):
        if start_at.minute <= time_span*i:
            if time_span*i == hour:
                start_at = start_at.replace(minute = 0,second = 0,microsecond = 0)
                start_at = start_at + datetime.timedelta(hours=1)
            elif start_at.minute<= time_span*i:
                start_at = start_at.replace(minute = time_span,second = 0,microsecond = 0)
    if start_at.minute <= 30:
        start_at = start_at.replace(minute = 30,second = 0,microsecond = 0)
    elif start_at.minute <= 59:
        start_at = start_at.replace(minute = 0,second = 0,microsecond = 0)
        start_at = start_at + datetime.timedelta(hours=1)
    if end_at.minute <= 30:
        start_at = start_at.replace(minute = 0,second = 0,microsecond = 0)
    elif end_at.minute <= 59:
        start_at = start_at.replace(minute = 30,second = 0,microsecond = 0)
    return start_at,end_at
    
def calc_empty_schedule_humans(base_user_id,input_dict):
    #入力データ処理
    starts_at_arrays = []
    ends_at_arrays = []
    base_starts_at_array = []
    base_ends_at_array = []
    for user_key in input_dict.keys():
       if user_key == base_user_id:
          for times_key in input_dict[user_key]["xxx_times"]:
              start_at = (datetime.datetime.fromtimestamp(int(times_key["starts_at"])))
              end_at = (datetime.datetime.fromtimestamp(int(times_key["ends_at"])))
              start_at,end_at = convert_start_end_time_to_span(start_at,end_at)
              base_starts_at_array.append(start_at)
              base_ends_at_array.append(end_at)
              starts_at_arrays.append(start_at)
              ends_at_arrays.append(end_at)
       else: 
          for times_key in input_dict[user_key]["xxx_times"]:
              start_at = datetime.datetime.fromtimestamp(int(times_key["starts_at"]))
              end_at = datetime.datetime.fromtimestamp(int(times_key["ends_at"]))
              start_at,end_at = convert_start_end_time_to_span(start_at,end_at)
              starts_at_arrays.append(start_at)
              ends_at_arrays.append(end_at)
    # print(starts_at_arrays)
    # print(ends_at_arrays)
    user_a_s = starts_at_arrays
    user_a_e = ends_at_arrays

    #時間のスパンの設定
    time_span = 30
    hour = 60
    time_span_num = time_span / hour

    #全ての入隊室を最初のを基準に時間のリストとする
    work_start_time = user_a_s[0]
    #検索期間の設定
    search_period  =datetime.timedelta(days=1)
    end =work_start_time+search_period
    hours=int(days_to_half_hours(search_period,time_span,hour))

    user_a_s_int_arrays =[]
    user_a_e_int_arrays =[]
    user_base_s_int_arrays =[]
    user_base_e_int_arrays =[]

    for i in base_starts_at_array:
        temp = days_to_half_hours(i- work_start_time,time_span,hour)
        user_base_s_int_arrays.append(temp)
    for i in base_ends_at_array:
        temp = days_to_half_hours(i- work_start_time,time_span,hour)
        user_base_e_int_arrays.append(temp)
    # print(user_base_s_int_arrays)
    # print(user_base_e_int_arrays)
    for i in user_a_s:
        temp = days_to_half_hours(i- work_start_time,time_span,hour)
        user_a_s_int_arrays.append(temp)
    for i in user_a_e:
        temp = days_to_half_hours(i-work_start_time,time_span,hour)
        user_a_e_int_arrays.append(temp)
    # print(user_a_e_int_arrays)
    #ismo
    table = [0]*hours
  

    for i in range(len(user_a_s)):
        table[user_a_s_int_arrays[i]]+=1
        table[user_a_e_int_arrays[i]]-=1

    for i in range(hours):
        if 0 < i:
            table[i]+= table[i-1]
    # print(table)#30分の隙間で見ている、１時間でみるなら
    #base_user処理
    matching_time=0
    for (start,end) in zip (user_base_s_int_arrays,user_base_e_int_arrays):
        base_user_table = table[start:end]
        if my_index(base_user_table,human_num)!=False:
            base_user_array_time = base_user_table.index(human_num) +start
            matching_time  =  list_num_to_time(work_start_time,base_user_array_time*time_span_num)
            break


    max_indexes =[i for i, v in enumerate(table) if v == max(table)]
    # print(max_indexes)
    max_times = []
    # for i in max_indexes:
    #     max_times.append(list_num_to_time(work_start_time,i*time_span_num))
    # # print(max_times)
    # if not max_times:
    #     print(0)
    #     exit()
    # else:
    #     matching_time = max_times[0]
    if matching_time ==0:
        print('No mathing')  
        return [],0
    matching_users = []
  
    for user_key in input_dict.keys():
        for times_key in input_dict[user_key]["xxx_times"]:
            starts_at = datetime.datetime.fromtimestamp(int(times_key["starts_at"]))
            ends_at = datetime.datetime.fromtimestamp(int(times_key["ends_at"]))
            if  starts_at <= matching_time < ends_at:
                matching_users.append(user_key)
    if len(matching_users) == 2:
        matching_time =int(matching_time.timestamp())
        return matching_users,matching_time
    elif len(matching_users) ==1:
        return [],0
    else:
        matching_users = random.sample(matching_users, 2)
        matching_time =int(matching_time.timestamp())
        return matching_users,matching_time
      

    matching_users = random.sample(matching_users, 2)
    print(table)
    print(matching_users)
    print(matching_time)
    matching_time =int(matching_time.timestamp())
    return matching_users,matching_time

matching_users,matching_time = calc_empty_schedule_humans(base_user_id,test_input)
#print(type(matching_users),type(matching_time))
#print(matching_users,matching_time)
# 実行結果
# <class 'list'> <class 'int'>
# ['user1', 'user3'] 1539138600