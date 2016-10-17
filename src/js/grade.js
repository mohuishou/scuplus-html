let grade = {};
grade.cal = function(data) {
  let termId = 1;
  let grade = [];

  for (let k = 1; k < 12; k++) {
    let sum = {
      all: {
        grade: 0,
        credit: 0,
        gpa: 0
      },
      required: {
        grade: 0,
        credit: 0,
        gpa: 0
      }

    };
    let avg = {
      all: {
        grade: 0,
        gpa: 0
      },
      required: {
        grade: 0,
        gpa: 0
      }

    };
    let t = [];
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      if (d.termId != k) {
        continue;
      }
      d.gradeCal = lv2grade(d.grade);
      d.gpa = grade2gpa(d.gradeCal);
      d.credit = parseFloat(d.credit);
      t.push(d);
      if (d.courseType == "必修") {
        sum.required.grade += d.gradeCal * d.credit;
        sum.required.credit += d.credit;
        sum.required.gpa += d.gpa * d.credit;
      }
      sum.all.grade += d.gradeCal * d.credit;
      sum.all.credit += d.credit;
      sum.all.gpa += d.gpa * d.credit;
    }
    if (!t[0]) {
      return grade;
    }
    //计算平均分保留两位小数
    avg.all.gpa = (sum.all.gpa / sum.all.credit).toFixed(2);
    avg.all.grade = (sum.all.grade / sum.all.credit).toFixed(2);

    avg.required.gpa = (sum.required.gpa / sum.required.credit).toFixed(2);
    avg.required.grade = (sum.required.grade / sum.required.credit).toFixed(2);
    grade[k - 1] = {}
    grade[k - 1].avg = avg;
    grade[k - 1].sum = sum;
    grade[k - 1].grades = t;

  }
  console.log(grade);

  return grade;
}

//分数绩点转换
function grade2gpa(grade) {
  var gpa = 0;
  if (grade >= 95) {
    gpa = 4.0;
  } else if (grade >= 90 && grade <= 94) {
    gpa = 3.8;
  } else if (grade >= 85 && grade <= 89) {
    gpa = 3.6;
  } else if (grade >= 80 && grade <= 84) {
    gpa = 3.2;
  } else if (grade >= 75 && grade <= 79) {
    gpa = 2.7;
  } else if (grade >= 70 && grade <= 74) {
    gpa = 2.2;
  } else if (grade >= 65 && grade <= 69) {
    gpa = 1.7;
  } else if (grade >= 60 && grade <= 64) {
    gpa = 1;
  } else if (grade < 60) {
    gpa = 0;
  }
  return gpa;
}

function trimStr(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//绩点分数转换
function lv2grade(g) {
  g = trimStr(g);
  if (!isNaN(g)) {
    return g;
  }
  switch (g) {
    case "优秀":
      g = 95;
      break;
    case "良好":
      g = 86;
      break;
    case "中等":
      g = 75;
      break;
    case "通过":
      g = 60;
      break;
    case "未通过":
      g = 0;
      break;
  }
  return g;
}

module.exports = grade;
