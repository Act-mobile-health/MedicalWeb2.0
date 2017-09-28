$(document).ready(function (e) {

    if(window.innerWidth<1000){
	$("#myTab").hide();
	$("#myTabSmall").show();
	}
	else{
	$("#myTab").show();
	$("#myTabSmall").hide();
	}

	if(window.innerWidth<1000){
	$("#mysidebar").hide();
	$("#mycontent").show();
	}

	$(window).resize(function(){
	    //console.log("window.width happened");
	    if($(window).width()<950){
	        //console.log("window.width happened");
	        $(".mysidebar").css("display","none");
	        $(".mycontent").css("width","100%");
	        $(".mycontent").css("margin-left","2%");
	    }else{
	        $(".mysidebar").css("display","block");
	        $(".mycontent").css("width","85%");
	        $(".mycontent").css("margin-left","15%");
	    }
	});


//    PatientDetailTable();
    showRelationInfo();
    getAppInfoNum();
    appendPatientDetail();
    calculateCATSum();
    calculateMBQSum1();
    calculateMBQSum2();

    changehref();
    changefolType();
    showAll('1');


//    for emergency
    forWizard_v("acuteExac", "disease", 0, "-EmergCallInfo");
    forWizard_v("byxCheck", "byxResult", 1, "-EmergCallInfo");
    forWizard_v("useAbt", "useAbtconfirm", 1, "-EmergCallInfo");
    forWizard_ecDate();
    forWizard_v("hospital", "treatMethod", 0, "-EmergCallInfo");
    forWizard_v("treatMethod", "medicine", 1, "-EmergCallInfo");

//    for outpatient
    forWizard_v("isSymptom", "symptom", 1, "-OutPatientServiceInfo");
    forWizard_v("physicalExam", "breathErr", 0, "-OutPatientServiceInfo");
    forWizard_v("acuteExac", "disease-o", 0, "-OutPatientServiceInfo");
    forWizard_v("useAbt", "abtType", 1, "-OutPatientServiceInfo");
    forWizard_v("treatMethod", "medicine-o", 1, "-OutPatientServiceInfo");

//    for inhospital
    forWizard_v("acuteExac", "disease-h", 0, "-InHospitalInfo");
    forWizard_v("byxCheck", "byxResult-h", 1, "-InHospitalInfo");
    forWizard_v("useAbt", "abtType-h", 1, "-InHospitalInfo");
    forWizard_v("hospital", "treatMethod-h", 0, "-InHospitalInfo");
    forWizard_v("treatMethod", "medicine-h", 1, "-InHospitalInfo");


    $("#submitPatientInfobt").click(function () {
        submitChangePatient();
    });

    $("#submitRelationInfobt").click(function () {
       submitRelationInfo();
    });

    $("#submitClinicbt").click(function () {
        submitClinic();
    })

    $("#submitESSbt").click(function () {
        submitQuestionnaire("0");
    })

    $("#submitMBQbt").click(function () {
       submitQuestionnaire("1");
    });

    $("#submitSGRQbt").click(function () {
        submitQuestionnaire("2");
    })

    $("#submitAccessoryExaminationbt").click(function () {
        submitAorAE("0");
    })

    $("#submitAttachInfobt").click(function () {
        submitAorAE("1");
    })

    $("#submitDiseasebt").click(function () {
        submitDisease();
    })

//    $("#submitOutPatientServiceInfobt").click(function () {
//       submitInfo("0");
//    });
//
//    $("#submitEmergCallInfobt").click(function () {
//        console.log("AAA")
//        submitInfo("1");
//    })
//
//    $("#submitInHospitalInfobt").click(function () {
//        submitInfo("2");
//    })


})
