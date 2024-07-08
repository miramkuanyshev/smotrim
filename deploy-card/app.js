const { createApp, ref } = Vue

  createApp({
    data() {
      const num1 = ref('');
      const num2 = ref('');
      const num3 = ref('');
      const num4 = ref('');
      const month  = ref('');
      const year = ref('');
      const name = ref('');

      const family = ref('');
      const fontSize = ref('1rem');
      const cvc = ref('');
      const inputPattern = /^[0-9]+$/;
      const letterPattern  =  /^[a-zA-Z]+$/;
      const isFlip  = ref(false);
      const errors = ref('');
      const cardNumberChech= ref(false);
      const cardMonthChech= ref(false);
      const cardYearChech= ref(false);
      const cardNameChech= ref(false);
      const cardFamilyChech= ref(false);
      const cardCvcChech= ref(false);
      const nameLenght  =  4;
      const familyLenght  =  10;
      
      return {
        num1, num2, num3, num4, month, year, name, family, fontSize, cvc, inputPattern, letterPattern, isFlip, errors,  cardNumberChech, cardMonthChech, cardYearChech, cardCvcChech, cardFamilyChech, cardNameChech, nameLenght,  familyLenght}
    },
    methods: {
      handleInput(e) {
        let cardNumber = '################';
        let inputNumber  =  e.target.value;
        cardNumber = String(inputNumber) + cardNumber.substring(inputNumber.length+1);  
        //валидация и присваивание значений элементам карты
        if (!this.inputPattern.test(inputNumber) && inputNumber.length!=0) {
            e.target.value = inputNumber.slice(0, -1);
            this.cardNumberChech=false
            e.target.style.borderColor = 'red';
            this.errors  = 'Нужно вводить только цифры';
        } else if (inputNumber.length > 16 ) {
            e.target.value = inputNumber.slice(0, -1);
            this.errors  = 'Количество цифр в номере карты - 16';
            this.cardNumberChech=false
            e.target.style.borderColor = 'red';
        }else if (inputNumber.length < 16 ) {            
            this.num1 = cardNumber.substring(0,4);
            this.num2 = cardNumber.substring(4,8);
            this.num3 = cardNumber.substring(8, 12);
            this.num4 = cardNumber.substring(12, 16);
            this.cardNumberChech=false
            e.target.style.borderColor = 'red';
            this.errors  = 'Количество цифр в номере карты - 16';
          } else {
            this.num1 = cardNumber.substring(0,4);
            this.num2 = cardNumber.substring(4,8);
            this.num3 = cardNumber.substring(8, 12);
            this.num4 = cardNumber.substring(12, 16);
            this.cardNumberChech=true
            e.target.style.borderColor = 'green';
            this.errors  = '';

          }
        
      },

      handleMonth(e)  {
        let monthInput = e.target.value.replace(/^0+/, '');
        
        if(!this.inputPattern.test(monthInput)  && monthInput.length!=0 )  {
          e.target.value = monthInput.slice(0, -1);
          e.target.style.borderColor = 'red';
          this.cardMonthChech=false;
          this.errors  = 'Нужно вводить только цифры';
        } else if(monthInput > 12 || monthInput < 0 || monthInput.length>2) {
          e.target.value = monthInput.slice(0, -1);
          this.cardMonthChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите значение от 1 до 12';
        } else if(monthInput == '' || monthInput == 0){
          this.month = '00';
          this.cardMonthChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите значение от 1 до 12';
        } else if  (monthInput  <  10 )   {
          this.month = '0' + monthInput;
          this.cardMonthChech=true;
          e.target.style.borderColor = 'green';
          this.errors  = '';
        } else  { 
          this.month = monthInput;
          this.cardMonthChech=true;
          e.target.style.borderColor = 'green';
          this.errors  = '';
        }
      },

      handleYear(e) {
        let yearInput  = e.target.value.replace(/^0+/, '');

        if(!this.inputPattern.test(yearInput)  && yearInput.length!=0 )  {
          e.target.value = yearInput.slice(0, -1);
          e.target.style.borderColor = 'red';
          this.errors  = 'Нужно вводить только цифры';
          this.cardYearChech=false;
        } else if(yearInput > 99 || yearInput < 0 || yearInput.length>2) {
          e.target.value = yearInput.slice(0, -1);
          this.cardYearChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите значение от 0 до 99';
        } else if(yearInput == '' || yearInput == 0){
          this.year = '00';
          e.target.style.borderColor = 'green';
          this.cardYearChech=true;
          this.errors  = '';
        } else if  (yearInput  <  10 )   {
          this.year = '0' + yearInput;
          e.target.style.borderColor = 'green';
          this.cardYearChech=true;
          this.errors  = '';
        } else  { 
          this.year = yearInput;
          e.target.style.borderColor = 'green';
          this.cardYearChech=true;
          this.errors  = '';
        }
      },
      fondSizeControls()  {
        if (this.name) {
          this.nameLenght = this.name.length;
        }
        if(this.family)  {
          this.familyLenght = this.family.length;
        }
        if(this.nameLenght + this.familyLenght > 23) {
          this.fontSize = '0.6rem';
        }
        if(this.nameLenght + this.familyLenght >=  20 && this.nameLenght + this.familyLenght < 23)  {
          this.fontSize = '0.7rem';
        }
        if(this.nameLenght + this.familyLenght >=  15 && this.nameLenght + this.familyLenght < 20)  {
          this.fontSize = '0.8rem';
        }
        if (this.nameLenght + this.familyLenght <  15) {
          this.fontSize = '1rem';
        }

      },
      handleName(e) {
        if (!this.letterPattern.test(e.target.value) && e.target.value.length != 0) {
          e.target.value = e.target.value.slice(0, -1);
          e.target.style.borderColor = 'red';
          this.cardNameChech=false;
          this.errors  = 'Введите имя латиницей';
        } else if (e.target.value.length + this.familyLenght > 25) {
          e.target.value = e.target.value.slice(0, -1);
          this.cardNameChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Превышено максимальное количество символов';
        } else if (e.target.value == 0) {
          this.name  = 'name';
          his.cardNameChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите имя';
        } else {
          this.name = e.target.value;
          this.cardNameChech=true;
          e.target.style.borderColor = 'green';
          this.errors  = '';
        }
        this.fondSizeControls();

      },
      handleFamily(e) {
        if (!this.letterPattern.test(e.target.value) && e.target.value.length != 0) {
          e.target.value = e.target.value.slice(0, -1);
          this.cardFamilyChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите фамилию латиницей';
        } else if (e.target.value.length + this.nameLenght > 25) {
          e.target.value = e.target.value.slice(0, -1);
          this.cardFamilyChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Превышено максимальное количество символов';
        } else if (e.target.value == 0) {
          this.family  = 'cardholder';
          this.cardFamilyChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Введите фамилию';
        } else {
          this.family = e.target.value;
          this.cardFamilyChech=true;
          e.target.style.borderColor = 'green';
          this.errors  = '';
        }
        this.fondSizeControls();

      }, 
      handleCvc(e)  {
        
        if (!this.inputPattern.test(e.target.value) && e.target.value.length != 0 ){
          e.target.value = e.target.value.slice(0, -1);
          this.cardCvcChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Нужно вводить только цифры';
        } else if (e.target.value.length > 3) { 
          e.target.value = e.target.value.slice(0, -1);
          this.cardCvcChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Превышено максимальное количество символов';
        } else if (e.target.value.length < 3) {
          this.cardCvcChech=false;
          e.target.style.borderColor = 'red';
          this.errors  = 'Минимальное количество символов - 3';
        }else if (e.target.value.length == 0) {
          this.cvc  =  '123';
          this.cardCvcChech=false;
          this.errors  = 'Введите CVC- код с обратной стороны карты';
        } else  {
          this.cvc = e.target.value;
          this.cardCvcChech=true;
          e.target.style.borderColor = 'green';
          this.errors  = '';
        }

      },

      goBack(){
        this.isFlip = true;
      },

      goFont(){
        this.isFlip = false;
      },
      validate(){
        if(this.cardCvcChech && this.cardFamilyChech && this.cardMonthChech && this.cardNameChech && this.cardYearChech && this.cardNumberChech ){          
          this.errors  = '';
          alert(`Данные успешно отправлены: \n
            Номер карты ${this.num1+' '+this.num2+' '+this.num3+ ' '+this.num4}\n
            Дата действия карты: ${this.month}/${this.year}\n
            Данные владельца карты: ${this.name} ${this.family}\n
            CVC-код: ${this.cvc}`);
        } else  {
          this.errors  = 'Заполните корректно все поля';
        }

      }
  }
  }).mount('#app')
