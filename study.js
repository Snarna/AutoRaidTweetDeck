var raidObj = {
    abiBaseElm: null,
    abiUseElm: null,
    summonBaseElm: null,
    ini: function() {
        this.abiBaseElm = document.createElement("div");
        this.abiUseElm = document.createElement("div");
        this.summonBaseElm = document.createElement("div");
        this.abiBaseElm.id = "mkt_quick_access_bar";
        this.abiUseElm.id = "mkt_ability_use_bar";
        this.summonBaseElm.id = "mkt_summon_use_bar";
        this.abiBaseElm.appendChild(this.abiUseElm);
        this.prtCommandElm = document.querySelector(".contents > .cnt-raid > .prt-command");
        if (this.prtCommandElm) this.prtSubCommandElm =
            this.prtCommandElm.querySelector(".prt-sub-command");
        this.popSummonDetailElm = document.querySelector(".contents > .pop-summon-detail")
    },
    prtSubCommandElm: null,
    prtCommandElm: null,
    popSummonDetailElm: null
};
var abilityObj = {
    0: {
        0: {
            recast: 0,
            elm: null
        },
        1: {
            recast: 0,
            elm: null
        },
        2: {
            recast: 0,
            elm: null
        },
        3: {
            recast: 0,
            elm: null
        }
    },
    1: {
        0: {
            recast: 0,
            elm: null
        },
        1: {
            recast: 0,
            elm: null
        },
        2: {
            recast: 0,
            elm: null
        },
        3: {
            recast: 0,
            elm: null
        }
    },
    2: {
        0: {
            recast: 0,
            elm: null
        },
        1: {
            recast: 0,
            elm: null
        },
        2: {
            recast: 0,
            elm: null
        },
        3: {
            recast: 0,
            elm: null
        }
    },
    3: {
        0: {
            recast: 0,
            elm: null
        },
        1: {
            recast: 0,
            elm: null
        },
        2: {
            recast: 0,
            elm: null
        },
        3: {
            recast: 0,
            elm: null
        }
    }
};
var summonArray = {
    1: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    },
    2: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    },
    3: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    },
    4: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    },
    5: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    },
    6: {
        id: null,
        pos: null,
        recast: 0,
        on: null,
        elm: null,
        skillname: null
    }
};

function setQAS() {
    var QAAS = getOption("system_qaas");
    var QSAS = getOption("system_qsas");
    if (!QAAS && !QSAS) return;
    raidObj.ini();
    _addMktBar();

    function _addMktBar() {
        if (raidObj.prtSubCommandElm) {
            raidObj.prtSubCommandElm.setAttribute("style", "margin-top:132px;");
            var targetCntMultiElm = document.querySelector("div.cnt-multi");
            if (targetCntMultiElm) targetCntMultiElm.style.marginTop = "462px";
            var recoverBtnElm = raidObj.prtSubCommandElm.querySelector(".btn-temporary");
            if (recoverBtnElm) recoverBtnElm.setAttribute("style",
                "margin-left:-5px;");
            if (QSAS) {
                var specialBtnElm = raidObj.prtSubCommandElm.querySelector(".btn-lock");
                if (specialBtnElm) specialBtnElm.setAttribute("style", "margin-left:-50px;");
                var battleSpeedElm = raidObj.prtSubCommandElm.querySelector(".btn-change-speed");
                if (battleSpeedElm) {
                    battleSpeedElm.style.zoom = "0.6";
                    battleSpeedElm.style.maxHeight = "36px";
                    battleSpeedElm.style.marginTop = "30px"
                }
            }
            raidObj.prtSubCommandElm.insertBefore(raidObj.abiBaseElm, raidObj.prtSubCommandElm.firstChild);
            if (QSAS) raidObj.prtSubCommandElm.parentNode.insertBefore(raidObj.summonBaseElm,
                raidObj.prtSubCommandElm.parentNode.lastChild)
        } else console.log("【×】mkt_quick_access_barの配置に失敗しました")
    }
    if (QAAS) setQAAS();
    if (QSAS) setQSAS()
}

function setQSAS() {
    _addSummonMouseOverEvent();

    function _addSummonMouseOverEvent() {
        if (raidObj.summonBaseElm) raidObj.summonBaseElm.addEventListener("mouseover", function(e) {
            var basePos = e.target.getAttribute("pos");
            if (basePos) {
                var summonID = summonArray[basePos].id;
                var recastNum = summonArray[basePos].recast;
                var summonSkillName = summonArray[basePos].skillname;
                var blankElms = raidObj.summonBaseElm.querySelectorAll(".mkt_summon_recast_num_blank");
                for (var n = 0; n < blankElms.length; n++)
                    if (blankElms[n].getAttribute("pos") ==
                        basePos) {
                        blankElms[n].className = "btn-summon-use mkt_summon_recast_num_blank";
                        blankElms[n].setAttribute("summon-id", summonID)
                    } else blankElms[n].className = "mkt_summon_recast_num_blank";
                var targetSummonOrgElm = document.querySelector(".contents > .pop-summon-detail > .prt-popup-footer > .btn-summon-use");
                if (targetSummonOrgElm) targetSummonOrgElm.setAttribute("summon-id", summonID);
                else console.log("【×】オリジナルの召喚ボタン要素の取得に失敗しました")
            }
        }, true)
    }
    var obsTargetSummonElm = raidObj.prtCommandElm.querySelector(".prt-command-summon > .prt-summon-list");
    if (obsTargetSummonElm) {
        var mo = new MutationObserver(_summonObserver);
        var opt = {
            attributes: true,
            attributeFilter: ["summon-recast", "class"],
            attributeOldValue: true,
            childList: true,
            subtree: true
        };
        mo.observe(obsTargetSummonElm, opt)
    }

    function _summonObserver(data1, data2) {
        var summonRewriteFlag = false;
        for (var c = 0; c < data1.length; c++) {
            var oldRecast = parseInt(data1[c].oldValue, 10);
            var summonID = data1[c].target.getAttribute("summon-id");
            var summonPos = data1[c].target.getAttribute("pos");
            if (oldRecast >= 0 && (parseInt(summonPos,
                    10) > 0 || summonID === "supporter")) {
                var newRecast = data1[c].target.getAttribute("summon-recast");
                var summonSkillName = data1[c].target.getAttribute("summon-skill-name");
                summonArray[summonPos] = {
                    id: summonID,
                    pos: summonPos,
                    recast: newRecast,
                    on: data1[c].target.className.indexOf("off") != -1 ? false : true,
                    elm: data1[c].target.cloneNode(true),
                    skillname: summonSkillName
                };
                summonRewriteFlag = true
            }
        }
        if (summonRewriteFlag) _summonInfoSet()
    }

    function _summonInfoSet() {
        if (!raidObj.summonBaseElm) {
            console.log("【×】mkt_summon_use_barを見つけられませんでした");
            return
        }
        var childElm;
        while (childElm = raidObj.summonBaseElm.lastChild) raidObj.summonBaseElm.removeChild(childElm);
        for (var n in summonArray)
            if (summonArray[n].elm) {
                var skillName = summonArray[n].elm.getAttribute("summon-skill-name");
                var summonName = summonArray[n].elm.getAttribute("summon-name");
                var summonRecastValue = summonArray[n].recast;
                var summonImageElm = summonArray[n].elm.querySelector("img");
                var summonOn = summonArray[n].on;
                var summonPos = summonArray[n].pos;
                var useBtnElm = document.createElement("div");
                useBtnElm.style.backgroundImage =
                    "url('" + summonImageElm.src + "')";
                useBtnElm.style.backgroundRepeat = "no-repeat";
                useBtnElm.style.backgroundPosition = "-7px -4px";
                useBtnElm.style.backgroundSize = "190%";
                useBtnElm.style.position = "relative";
                useBtnElm.className = "mkt_summon_call";
                var setSummonRecasInfoElm = document.createElement("div");
                if (summonRecastValue == 0) {
                    useBtnElm.appendChild(setSummonRecasInfoElm);
                    setSummonRecasInfoElm.setAttribute("pos", summonPos);
                    if (summonOn == false) setSummonRecasInfoElm.className = "mkt_summon_recast_num";
                    else setSummonRecasInfoElm.className =
                        "mkt_summon_recast_num_blank"
                } else {
                    setSummonRecasInfoElm.className = "mkt_summon_recast_num";
                    setSummonRecasInfoElm.textContent = summonRecastValue;
                    useBtnElm.appendChild(setSummonRecasInfoElm)
                }
                raidObj.summonBaseElm.appendChild(useBtnElm)
            }
    }
}

function setQAAS() {
    var obsTargetElm = document.querySelector("div.btn-attack-start");
    if (obsTargetElm) {
        var mo = new MutationObserver(_atkObserver);
        var opt = {
            attributes: true,
            attributeFilter: ["class"],
            attributeOldValue: true
        };
        mo.observe(obsTargetElm, opt)
    }

    function _atkObserver(data1, data2) {
        if (data1[0].oldValue.indexOf("display-off") != -1 && data1[0].target.className.indexOf("display-on") != -1) _abilityInfoSet();
        else if (data1[0].oldValue === "btn-attack-start" && data1[0].target.className === "btn-attack-start display-on") _abilityInfoSet();
        else if (data1[0].oldValue === "btn-attack-start on display-off") console.log(data1[0].oldValue);
        else;
    }

    function _abilityInfoSet() {
        var _charaListElms = raidObj.prtCommandElm.querySelectorAll(".prt-command-chara > .prt-ability-list");
        for (var t = 0; t < 4; t++)
            if (_charaListElms[t]) {
                var _abiElms = _charaListElms[t].querySelectorAll(".lis-ability");
                for (var c = 0; c < 4; c++)
                    if (_abiElms[c]) {
                        var _abiRecastDivElm = _abiElms[c].querySelector("div[ability-recast]");
                        if (_abiRecastDivElm) {
                            abilityObj[t][c]["recast"] = _abiRecastDivElm.getAttribute("ability-recast");
                            abilityObj[t][c]["elm"] = _abiRecastDivElm.parentNode.cloneNode(true)
                        } else;
                    } else console.log("【×】例外:アビリティ不明:" + c)
            } else console.log("【×】例外？:キャラクタ不明:" + t);
        _rewriteAbilityElm();

        function _rewriteAbilityElm() {
            if (!raidObj.abiUseElm) {
                console.log("【×】mkt_ability_use_barが見つからないので、リキャスト情報を書き込めません");
                return
            }
            var childElm;
            while (childElm = raidObj.abiUseElm.lastChild) raidObj.abiUseElm.removeChild(childElm);
            for (var n in abilityObj) {
                var createElm_chara = document.createElement("div");
                createElm_chara.setAttribute("class",
                    "prt-ability-list");
                raidObj.abiUseElm.appendChild(createElm_chara);
                var _debugTxt = "\t";
                for (var t in abilityObj[n]) {
                    if (!abilityObj[n][t]["elm"]) {
                        abilityObj[n][t]["elm"] = document.createElement("div");
                        abilityObj[n][t]["elm"].setAttribute("style", "width:44px;")
                    }
                    var _recastInfoElm = abilityObj[n][t]["elm"].querySelector("div > div[ability-recast]");
                    if (_recastInfoElm && _recastInfoElm.getAttribute("ability-recast") !== "0") {
                        var _recastValue = parseInt(_recastInfoElm.getAttribute("ability-recast"), 10);
                        if (_recastValue >
                            0) {
                            var _absoluteRecastNumElm = document.createElement("span");
                            _absoluteRecastNumElm.textContent = _recastValue;
                            _absoluteRecastNumElm.setAttribute("class", "mkt_abilityNum_absolute");
                            abilityObj[n][t]["elm"].style.position = "relative";
                            abilityObj[n][t]["elm"].appendChild(_absoluteRecastNumElm)
                        }
                    }
                    createElm_chara.appendChild(abilityObj[n][t]["elm"])
                }
            }
        }
    }
};
