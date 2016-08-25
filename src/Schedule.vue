<template>
  <div id="schedule">
    <table class="">
      <thead class="">
        <tr>
          <th></th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
          <th>周日</th>
        </tr>
      </thead>
      <tbody id="schedule-data">
      
      </tbody>
    </table>
  </div>

</template>


<style>
  
  #schedule{
    background: #fff;
    padding: 10px;
  }
  table {
    border: 1px solid #ccc;
    width:95%;
    margin:0;
    padding:0;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
    font-size:12px;
    color: #333244;
  }
  table tr ,table caption{
    border: 1px solid #ddd;
    padding: 5px;
  }
  table th, table td {
    padding:5px 8px;
    text-align: center;
  }
  table th {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }

  table caption{
    background: #495c70;
    color: #fff;
    border-bottom: none;
    font-size: 16px;
  }
  
  table .title{
    border: 1px solid #ddd;
  }

  #schedule td{
    width:70px;
  }


  table thead tr,table thead th{
    border:none;
  }

  
</style>

<script>


export default {
  
}

const schedule_data= [
        {
            "id": 39,
            "studyWay": "正常",
            "courseType": "选修",
            "chooseType": "选中",
            "cid": 3377,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3377,
                "college": "电子信息学院",
                "courseId": "205051030",
                "name": "软件工程",
                "lessonId": "02",
                "credit": "3.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "3",
                "session": "10,11,12",
                "campus": "望江",
                "building": "基教楼C座",
                "classroom": "C202",
                "max": "238",
                "studentNumber": "65",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 1,
                "avg_star": 4.55,
                "created_at": "1471515829",
                "updated_at": "1471703074",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1114,
                        "college": "电子信息学院",
                        "name": "赵成萍",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 1,
                        "avg_star": 4.55,
                        "created_at": "1471515785",
                        "updated_at": "1471703074",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3377,
                            "tid": 1114
                        }
                    }
                ]
            }
        },
        {
            "id": 40,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 7212,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 7212,
                "college": "党委学生工作部（处）",
                "courseId": "998013000",
                "name": "形势与政策-5",
                "lessonId": "19",
                "credit": "0.0",
                "examType": "考试",
                "allWeek": "2,4,6,8,10,12,14,16,18",
                "day": "5",
                "session": "10,11",
                "campus": "望江",
                "building": "基教楼C座",
                "classroom": "C202",
                "max": "238",
                "studentNumber": "194",
                "courseLimit": "允许修读类型主修;",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471522156",
                "updated_at": "1471522156",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2987,
                        "college": "党委学生工作部（处）",
                        "name": "吴秀玲",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471522157",
                        "updated_at": "1471522157",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 7212,
                            "tid": 2987
                        }
                    }
                ]
            }
        },
        {
            "id": 41,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6529,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6529,
                "college": "电子信息学院",
                "courseId": "602015030",
                "name": "自控原理（全英文）",
                "lessonId": "01",
                "credit": "3.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "2",
                "session": "10,11,12",
                "campus": "望江",
                "building": "二教",
                "classroom": "205",
                "max": "58",
                "studentNumber": "53",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520917",
                "updated_at": "1471520917",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1162,
                        "college": "电子信息学院",
                        "name": "宁芊",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515925",
                        "updated_at": "1471515925",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6529,
                            "tid": 1162
                        }
                    }
                ]
            }
        },
        {
            "id": 42,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6528,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6528,
                "college": "电子信息学院",
                "courseId": "602014030",
                "name": "数字信号处理（双语）",
                "lessonId": "01",
                "credit": "3.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "3",
                "session": "5,6,7",
                "campus": "望江",
                "building": "基教楼A座",
                "classroom": "A602",
                "max": "108",
                "studentNumber": "53",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520915",
                "updated_at": "1471520915",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1128,
                        "college": "电子信息学院",
                        "name": "张宏",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515831",
                        "updated_at": "1471515831",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6528,
                            "tid": 1128
                        }
                    }
                ]
            }
        },
        {
            "id": 43,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6527,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6527,
                "college": "电子信息学院",
                "courseId": "602013030",
                "name": "计算机通信与网络",
                "lessonId": "01",
                "credit": "3.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "2",
                "session": "5,6,7",
                "campus": "望江",
                "building": "三教",
                "classroom": "335",
                "max": "106",
                "studentNumber": "54",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520914",
                "updated_at": "1471520914",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1166,
                        "college": "电子信息学院",
                        "name": "严斌宇",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515935",
                        "updated_at": "1471515935",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6527,
                            "tid": 1166
                        }
                    }
                ]
            }
        },
        {
            "id": 46,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6525,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6525,
                "college": "电子信息学院",
                "courseId": "602012040",
                "name": "现代通信技术（双语）",
                "lessonId": "01",
                "credit": "4.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "4",
                "session": "8,9",
                "campus": "望江",
                "building": "三教",
                "classroom": "246",
                "max": "106",
                "studentNumber": "53",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520908",
                "updated_at": "1471520908",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2656,
                        "college": "电子信息学院",
                        "name": "熊淑华",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471520910",
                        "updated_at": "1471520910",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6525,
                            "tid": 2656
                        }
                    }
                ]
            }
        },
        {
            "id": 47,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6526,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6526,
                "college": "电子信息学院",
                "courseId": "602012040",
                "name": "现代通信技术（双语）",
                "lessonId": "01",
                "credit": "4.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "1",
                "session": "1,2",
                "campus": "望江",
                "building": "三教",
                "classroom": "246",
                "max": "106",
                "studentNumber": "53",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520911",
                "updated_at": "1471520911",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2656,
                        "college": "电子信息学院",
                        "name": "熊淑华",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471520910",
                        "updated_at": "1471520910",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6526,
                            "tid": 2656
                        }
                    }
                ]
            }
        },
        {
            "id": 50,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6523,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6523,
                "college": "电子信息学院",
                "courseId": "602011045",
                "name": "电磁场与微波技术",
                "lessonId": "01",
                "credit": "4.5",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "2",
                "session": "1,2,3",
                "campus": "望江",
                "building": "三教",
                "classroom": "410",
                "max": "57",
                "studentNumber": "56",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520905",
                "updated_at": "1471520905",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2655,
                        "college": "电子信息学院",
                        "name": "闫丽萍",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471520905",
                        "updated_at": "1471520905",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6523,
                            "tid": 2655
                        }
                    },
                    {
                        "id": 1116,
                        "college": "电子信息学院",
                        "name": "魏念东",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515789",
                        "updated_at": "1471515789",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6523,
                            "tid": 1116
                        }
                    }
                ]
            }
        },
        {
            "id": 51,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 6524,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 6524,
                "college": "电子信息学院",
                "courseId": "602011045",
                "name": "电磁场与微波技术",
                "lessonId": "01",
                "credit": "4.5",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "5",
                "session": "1,2,3",
                "campus": "望江",
                "building": "基教楼A座",
                "classroom": "A418",
                "max": "57",
                "studentNumber": "56",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471520907",
                "updated_at": "1471520907",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2655,
                        "college": "电子信息学院",
                        "name": "闫丽萍",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471520905",
                        "updated_at": "1471520905",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6524,
                            "tid": 2655
                        }
                    },
                    {
                        "id": 1116,
                        "college": "电子信息学院",
                        "name": "魏念东",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515789",
                        "updated_at": "1471515789",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 6524,
                            "tid": 1116
                        }
                    }
                ]
            }
        },
        {
            "id": 52,
            "studyWay": "正常",
            "courseType": "选修",
            "chooseType": "置入",
            "cid": 5464,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 5464,
                "college": "公共管理学院",
                "courseId": "401092030",
                "name": "领导科学与艺术",
                "lessonId": "01",
                "credit": "3.0",
                "examType": "考试",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "1",
                "session": "10,11,12",
                "campus": "望江",
                "building": "三教",
                "classroom": "117",
                "max": "113",
                "studentNumber": "104",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471519050",
                "updated_at": "1471519050",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 2104,
                        "college": "公共管理学院",
                        "name": "马辰威",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471519051",
                        "updated_at": "1471519051",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 5464,
                            "tid": 2104
                        }
                    }
                ]
            }
        },
        {
            "id": 53,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 3402,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3402,
                "college": "电子信息学院",
                "courseId": "205078010",
                "name": "微机原理与接口技术实验",
                "lessonId": "03",
                "credit": "1.0",
                "examType": "考查",
                "allWeek": "2,3,4,5,6,7,8,9,10",
                "day": "3",
                "session": "1,2,3,4",
                "campus": "望江",
                "building": "实验室",
                "classroom": "基教B520",
                "max": "198",
                "studentNumber": "53",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471515864",
                "updated_at": "1471515864",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1115,
                        "college": "电子信息学院",
                        "name": "蔡锦成",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515788",
                        "updated_at": "1471515788",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3402,
                            "tid": 1115
                        }
                    }
                ]
            }
        },
        {
            "id": 54,
            "studyWay": "正常",
            "courseType": "必修",
            "chooseType": "置入",
            "cid": 3396,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3396,
                "college": "电子信息学院",
                "courseId": "205070010",
                "name": "通信原理实验",
                "lessonId": "03",
                "credit": "1.0",
                "examType": "考查",
                "allWeek": "11,12,13,14,15,16",
                "day": "4",
                "session": "1,2,3,4",
                "campus": "望江",
                "building": "实验室",
                "classroom": "基教B518",
                "max": "198",
                "studentNumber": "63",
                "courseLimit": "允许系所专业电子信息学院;",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471515856",
                "updated_at": "1471515856",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1139,
                        "college": "电子信息学院",
                        "name": "李佐儒",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515854",
                        "updated_at": "1471515854",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3396,
                            "tid": 1139
                        }
                    }
                ]
            }
        },
        {
            "id": 55,
            "studyWay": "正常",
            "courseType": "选修",
            "chooseType": "置入",
            "cid": 3391,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3391,
                "college": "电子信息学院",
                "courseId": "205067030",
                "name": "随机信号分析",
                "lessonId": "03",
                "credit": "3.0",
                "examType": "考试",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "1",
                "session": "5,6,7",
                "campus": "望江",
                "building": "二教",
                "classroom": "206",
                "max": "118",
                "studentNumber": "44",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471515849",
                "updated_at": "1471515849",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1137,
                        "college": "电子信息学院",
                        "name": "夏秀渝",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515849",
                        "updated_at": "1471515849",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3391,
                            "tid": 1137
                        }
                    }
                ]
            }
        },
        {
            "id": 56,
            "studyWay": "正常",
            "courseType": "选修",
            "chooseType": "置入",
            "cid": 3346,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3346,
                "college": "电子信息学院",
                "courseId": "205015020",
                "name": "程控测试技术及虚拟仪器",
                "lessonId": "01",
                "credit": "2.0",
                "examType": "考试",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "1",
                "session": "3,4",
                "campus": "望江",
                "building": "三教",
                "classroom": "247",
                "max": "163",
                "studentNumber": "106",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471515788",
                "updated_at": "1471515788",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1115,
                        "college": "电子信息学院",
                        "name": "蔡锦成",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515788",
                        "updated_at": "1471515788",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3346,
                            "tid": 1115
                        }
                    }
                ]
            }
        },
        {
            "id": 57,
            "studyWay": "正常",
            "courseType": "选修",
            "chooseType": "置入",
            "cid": 3449,
            "term": "2016.1",
            "uid": 10,
            "created_at": "1471593070",
            "updated_at": "1471593070",
            "deleted_at": 0,
            "course": {
                "id": 3449,
                "college": "电子信息学院",
                "courseId": "205130030",
                "name": "物联网技术及应用",
                "lessonId": "01",
                "credit": "3.0",
                "examType": "",
                "allWeek": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                "day": "4",
                "session": "5,6,7",
                "campus": "望江",
                "building": "基教楼C座",
                "classroom": "C204",
                "max": "332",
                "studentNumber": "57",
                "courseLimit": ";",
                "count_grade": 0,
                "pass_rate": 0,
                "avg_grade": 0,
                "count_star": 0,
                "avg_star": 0,
                "created_at": "1471515929",
                "updated_at": "1471515929",
                "deleted_at": 0,
                "teacher": [
                    {
                        "id": 1165,
                        "college": "电子信息学院",
                        "name": "黄霖宇",
                        "count_garde": 0,
                        "pass_rate": 0,
                        "avg_grade": 0,
                        "count_star": 0,
                        "avg_star": 0,
                        "created_at": "1471515929",
                        "updated_at": "1471515929",
                        "deleted_at": 0,
                        "pivot": {
                            "cid": 3449,
                            "tid": 1165
                        }
                    }
                ]
            }
        }
    ];
$(document).ready(function(){
  schedule(schedule_data);
});


function schedule(d) {
  
  for (let i=0;i<13; i++) {
    let html="<tr><td>"+(i+1)+"</td>"
    
    for( let m=0 ; m<d.length ;m++){
      const course_data=d[m].course;
      const teacher_data=course_data.teacher;
      const session=course_data.session.split(",");
      for(let s=1 ; s<=7 ;s++){
        console.log(course_data.day);
        if(course_data.day==s){
          if(session[0]==(i+1)){
            html += '<td rowspan="'+session.length+'">'+course_data.name+'@'+course_data.campus+course_data.building+course_data.classroom+'</td>';
          }
        }
      }
    }
    
    html += '</tr>';
    $("#schedule-data").append(html);
  }

  
}
</script>