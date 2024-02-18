// PinArea.js
import { ref, onMounted, defineEmits } from 'vue';
import { DELETE_KEY } from '../utils/constants.js';
import '../css/pin-area.css'

const PinArea = {
  props: ['length', 'list', 'modelValue', 'color', 'isFocus', 'errorMessage', 'label'],

  setup(props) {
    const inputRef_0 = ref();
    const inputRef_1 = ref();
    const inputRef_2 = ref();
    const inputRef_3 = ref();
    const selectedNumber = ref([{ number: '' }]);
    const type = ref(false);

    onMounted(() => {
      if(inputRef_0.value && inputRef_0.value.length && props.isFocus) inputRef_0.value[0].focus();
      if(props.length) {
        for (let i = 0; i <= props.length; i++) {
          selectedNumber.value[i] = {number: ''}
        }
      }
      if(props.modelValue && typeof props.modelValue === 'string') {
        const value = props.modelValue.split('')
        if(value && value.length) {
          value.forEach((p, i) => {
            selectedNumber.value[i].number = p
          })
        }
      }
    });

    const emits = defineEmits(['update:modelValue']);

    const focusInput = () => {
      if (inputRef_0.value && inputRef_0.value.length) inputRef_0.value[0].focus();
    };

    const focusLastInput = () => {
      if (inputRef_3.value && inputRef_3.value.length) inputRef_3.value[0].focus();
    };

    const inputFocused = (ref) => {
      if (ref && ref.length) ref[0].focus();
    };

    const change = (val) => {
      let index = 0
      const item = selectedNumber.value.find((p, i) => {
        index = i
        return p.number === ''
      })
      const arrayItem = selectedNumber.value[3].number
      if (item && val !== DELETE_KEY) item.number = val
      if (val === DELETE_KEY && index && !arrayItem && arrayItem !== 0) {
        selectedNumber.value[index - 1].number = ''
      } else if (val === DELETE_KEY && index === 3 && (arrayItem === 0 || arrayItem)) {
        selectedNumber.value[index].number = ''
      }
      let value = ''
      if (value.length < 4) {
        for (let i = 0; i < selectedNumber.value.length; i++) {
          const arrayIndexItem = selectedNumber.value[i].number
          if((arrayIndexItem || arrayIndexItem === 0))
            value += arrayIndexItem
        }
      }
      emits('update:modelValue', value)
    };

    const changeInput = (val, ref) => {
      const indexValue = props.list.includes(+val)
      if (val && ref?.length && indexValue) {
        ref[0].focus()
      }
    };

    const changeKey = (val, ref) => {
      if(val.key === 'Backspace' && !val.target.value && ref?.length)
        ref[0].focus()
    };

    return {
      inputRef_0,
      inputRef_1,
      inputRef_2,
      inputRef_3,
      selectedNumber,
      type,
      emits,
      focusInput,
      focusLastInput,
      inputFocused,
      change,
      changeInput,
      changeKey,
    };
  },

  template: `
    <div class="pin-area">
      <div class="pin-area__block">
        <div
          v-for="(item, i) in selectedNumber"
          :key="`index-${i}`"
          type="text"
          :class="['pin-area__block__input', { 'pin-area__block__input--error': errorMessage }]"
        >
          <input
            inputmode='none'
            :type="type ? 'text' : 'password'"
            @input="changeInput(item.number, $refs[`inputRef_${i+1}`])"
            @keydown="$event => changeKey($event, $refs[`inputRef_${i-1}`])"
            @focus="inputFocused($refs[`inputRef_${i}`])"
            :ref="`inputRef_${i}`"
            v-maska="'#'"
            v-model="item.number"
          >
        </div>
        <div class="mt-15 pin-area__block__password-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="type" class="w-[25px]" @click="type = !type" >
            <!-- ... SVG ma'lumotlari ... -->
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-else class="w-[25px]" @click="type = !type">
            <!-- ... SVG ma'lumotlari ... -->
          </svg>
        </div>
        <span v-if="errorMessage" class="pin-area__block__message">{{ errorMessage }}</span>
        <span v-else-if="label" class="pin-area__block__label">{{ label }}</span>
      </div>
    </div>
  `,
};

export default PinArea;
