/*
    환경변수를 비교하여 개발자 모드인지 배포후 사용되는 지 비교함

    개발자 모드에서는 : 
        development 출력

    배포 후 해코쿠 이용시 : 
        production 출력
        해로쿠에서 값을 관리함
*/

if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}