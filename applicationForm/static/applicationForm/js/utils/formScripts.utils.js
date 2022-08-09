const getDocObject = () => {
  docObject = [];
  if ($("#applicantAnonYes").is(":checked") && !!$("#anonReqText").val()) {
    anon = {
      id: 1,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.anon.title,
      desc: docDetails.anon.desc,
      page: 1,
      text: $("#anonReqText").val(),
    };
    docObject.push(anon);
  }
  if (!!$("#stofFactsExtra").val()) {
    facts = {
      id: 2,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.fact.title,
      desc: docDetails.fact.desc,
      page: 1,
      text: $("#stofFactsExtra").val(),
    };
    docObject.push(facts);
  }
  if ($("#orgOffEntitledYes").is(":checked")) {
    official = {
      id: 3,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgOff.title,
      desc: docDetails.orgOff.desc,
      page: 1,
      text: "",
    };
    docObject.push(official);
  }

  if ($("#orgDateNo").is(":checked") && !!$("#orgDateNoArea").val()) {
    orgDateText = {
      id: 4,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.regDate.title,
      desc: docDetails.regDate.desc,
      page: 1,
      text: $("#orgDateNoArea").val(),
    };
    docObject.push(orgDateText);
  }
  if ($("#orgIdentityNo").is(":checked") && !!$("#orgIdentityNoArea").val()) {
    orgIdentityText = {
      id: 5,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgID.title,
      desc: docDetails.orgID.desc,
      page: 1,
      text: $("#orgIdentityNoArea").val(),
    };
    docObject.push(orgIdentityText);
  }
  if ($("#indNLAuthorityQn2").is(":checked") && !!$("#indNLAuthArea").val()) {
    indNLAuthText = {
      id: 6,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.indNLAuth.title,
      desc: docDetails.indNLAuth.desc,
      page: 1,
      text: $("#indNLAuthArea").val(),
    };
    docObject.push(indNLAuthText);
  }

  if (
    $("#indNLFaxOption:checked").val() === "No" &&
    !!$("#indNLFaxArea").val()
  ) {
    indNLFaxText = {
      id: 7,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.indNLFax.title,
      desc: docDetails.indNLFax.desc,
      page: 1,
      text: $("#indNLFaxArea").val(),
    };
    docObject.push(indNLFaxText);
  }

  if ($("#indLFaxOption:checked").val() === "No" && !!$("#indLFaxArea").val()) {
    indLFaxText = {
      id: 8,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.indLFax.title,
      desc: docDetails.indLFax.desc,
      page: 1,
      text: $("#indLFaxArea").val(),
    };
    docObject.push(indLFaxText);
  }

  if ($("#LotherNLNo").is(":checked") && !!$("#indLAuthAreaNo").val()) {
    indLOtherNoText = {
      id: 10,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.indLAuth.title,
      desc: docDetails.indLAuth.desc,
      page: 1,
      text: $("#indLAuthAreaNo").val(),
    };
    docObject.push(indLOtherNoText);
  }
  if (
    $("#orgNLFaxOption:checked").val() === "on" &&
    !!$("#orgNLFaxArea").val()
  ) {
    orgNLFaxText = {
      id: 11,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgOffFax.title,
      desc: docDetails.orgOffFax.desc,
      page: 1,
      text: $("#orgNLFaxArea").val(),
    };
    docObject.push(orgNLFaxText);
  }
  if ($("#orgLFaxOption:checked").val() === "on" && !!$("#orgLFaxArea").val()) {
    orgLFaxText = {
      id: 12,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgLFax.title,
      desc: docDetails.orgLFax.desc,
      page: 1,
      text: $("#orgLFaxArea").val(),
    };
    docObject.push(orgLFaxText);
  }
  if (
    $("#orgOffEntitledNo").is(":checked") &&
    !!$("#orgNLOfficialAreaNo").val()
  ) {
    orgNLOfficial = {
      id: 13,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgNLOff.title,
      desc: docDetails.orgNLOff.desc,
      page: 1,
      text: $("#orgNLOfficialAreaNo").val(),
    };
    docObject.push(orgNLOfficial);
  }

  if ($("#orgAttorneyNo").is(":checked") && !!$("#orgAutorityAreaNo").val()) {
    orgAutorityAreaNo = {
      id: 14,
      date: moment().format("DD-MM-YYYY"),
      title: docDetails.orgAuth.title,
      desc: docDetails.orgAuth.desc,
      page: 1,
      text: $("#orgAutorityAreaNo").val(),
    };
    docObject.push(orgAutorityAreaNo);
  }
  return docObject;
};
