let shiftActive= false;

//clears the screen of numbers
function clearScreen() {
    const calc = document.getElementById('calc');
    calc.value= "";
    updateDisplay()
}
//adds whatever characters must be added depending on the button pressed
function appendChar(button) {
    const calc = document.getElementById('calc');
    if (!calc.disabled){
        let char = button.textContent
        calc.value += char;
        
    }
    updateDisplay()
}
Radians="DEGREES";
//calculates the answer when the equals button is pressed
function calculate() {
    const result = document.getElementById('result');
    const calc = document.getElementById('calc');
    const ans = parseFloat(result.value)
    if (!result.disabled){
    try {
        let calc_value = calc.value
        //handles trig
        calc_value= interpet_Calc(calc_value,ans)
        result.value = parseFloat(eval(calc_value).toFixed(3));
        if (result.value > 1e7){
            result.value = Number(result.value).toExponential(3);
        }
    } catch (error) {
        console.log(error)
        result.value = "Error";
    }
}
}
//handles deleting a character when the delete button is pressed
function deleteChar() {
    const calc = document.getElementById('calc');
    calc.value = calc.value.slice(0,-1);
    updateDisplay()
}
//turns the calulator on and off
function toggleCalculator(){
    const result = document.getElementById('result');
    const calc = document.getElementById('calc');
    result.value = ""
    calc.value =""
    result.disabled= !result.disabled
    calc.disabled= !calc.disabled
    updateDisplay()
}
//calculates trigonometric values
function trigCalculate(func,angle,Radians,multi){
    console.log(func,angle,Radians,multi)
    console.log(Radians)
    multi = parseFloat(multi)
    console.log(multi)
        if(Radians != "RADIANS"){
            angle= Number((parseFloat(angle)*Math.PI)/180)
        }
        switch(func){
            case "sin":
                return multi*Math.sin(angle).toFixed(5)
            case "cos":
                return multi*Math.cos(angle).toFixed(5)
            case "tan":
                if (angle==90){
                    return "undefined"
                }
                return multi*Math.tan(angle).toFixed(5)
        }
    }
//toggles the Trigonometry mode between degrees and radians
function toggleTrig(){
    if (Radians === "RADIANS"){
        Radians="DEGREES"
    }
    else{
        Radians="RADIANS"
    }
    const Trig_text = document.getElementById('Trig_text');
    Trig_text.textContent=Radians
    return Radians

}
//calculates powers
function powerCalculate(base,power){
    console.log(base**power)
    return base**power
    
}



function updateDisplay() {
    const calc = document.getElementById('calc');
    calc.scrollLeft = calc.scrollWidth;
  }
function shiftButton(){
    shiftActive=!shiftActive
    const shiftableButtons = document.querySelectorAll('[data-shift]');
    shiftableButtons.forEach((button) => {
        const temp = button.textContent
        button.textContent = button.dataset.shift
        button.dataset.shift = temp
        if (shiftActive) {
          button.classList.add('shift-active');
        } else {
          button.classList.remove('shift-active');
        }
      });
}
function inverse_TrigCalculate(Radians,multi,func,num){
    multi = parseFloat(multi)
        if(Radians != "RADIANS"){
            degree_change= 180/Math.PI
        }
        switch(func){
            case "sin⁻¹":
                return degree_change*multi*Math.asin(num).toFixed(5)
            case "cos⁻¹":
                return degree_change*multi*Math.acos(num).toFixed(5)
            case "tan⁻¹":
                return degree_change*multi*Math.atan(num).toFixed(5)
        }
    }

function interpet_Calc(calc_value,ans){
    const trig_reg_ex=/(-?\d+\.?\d*)?(sin|cos|tan)\((-?\d+\.?\d*)\)/g
    const inv_trig_reg_ex=/(-?\d+\.?\d*)?(sin⁻¹|cos⁻¹|tan⁻¹)\((-?\d+\.?\d*)\)/g
    const ans_reg_ex= /Ans/g
    const sqrt_reg_ex= /sqrt\((\d+\.?\d*)\)/g
    const Abs_reg_ex=/Abs\((-?\d+\.?\d*)\)/g
    const log_reg_ex= /log(\d+\.?\d*)\((\d+\.?\d*)\)/g
    const ln_reg_ex=/ln\((\d+\.?\d*)\)/g
    //handles arcsin,arccos,arctan
    calc_value = calc_value.replace(inv_trig_reg_ex,(match,multi,func,num)=>{
        multi =multi? parseFloat(multi):1
        console.log(multi,func,num)
        return inverse_TrigCalculate(Radians,multi,func,num)
    })
    //handles sin,cos,tan
    calc_value = calc_value.replace(trig_reg_ex,(match,multi,func,angle)=>{
        multi =multi? parseFloat(multi):1
        return trigCalculate(func,angle,Radians,multi)
    })
    //handles absolute values
    calc_value = calc_value.replace(Abs_reg_ex,(match,num)=>{
    return Math.abs(num)
})
    //handles exponentiation
    calc_value = calc_value.replace(`^`,(`**`))
    //handles PI
    calc_value = calc_value.replace(`π`,(Math.PI))
    calc_value = calc_value.replace(`e`,(Math.E))
    //handles sqrt
    calc_value = calc_value.replace(sqrt_reg_ex,(match,num)=>{
        return Math.sqrt(parseFloat(num))
    })
    //handles logs
    calc_value = calc_value.replace(log_reg_ex,(match,base,num)=>{
        return Math.log(num)/Math.log(base)
    })
    //handles natural logs
    calc_value = calc_value.replace(ln_reg_ex,(match,num)=>{
        return Math.log(num)
    })
    //handles ans
    calc_value = calc_value.replace(ans_reg_ex,(ans|| 0))
    return calc_value
}


  