import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';

class Lotto {
  private readonly numbers: number[];

  constructor(numbers: number[]) {
    this.validateNumbersCount(numbers);
    this.validateNumbersDuplicates(numbers);
    this.numbers = numbers;
  }

  private validateNumbersCount(numbers: number[]) {
    if (numbers.length !== LOTTO_CONFIG.NUMBERS_COUNT) {
      throw new Error(ERROR_MESSAGES.NUMBERS_INVALID_COUNT);
    }
  }

  private validateNumbersDuplicates(numbers: number[]) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.NUMBERS_DUPLICATES);
    }
  }

  public getNumbers() {
    return this.numbers;
  }
}

export default Lotto;
