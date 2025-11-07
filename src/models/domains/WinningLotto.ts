import Lotto from './Lotto.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';

class WinningLotto extends Lotto {
  private readonly bonusNumber: number;

  constructor(numbers: number[], bonusNumber: number) {
    super(numbers);

    this.validateBonusNumberDuplicates(numbers, bonusNumber);
    this.bonusNumber = bonusNumber;
  }

  private validateBonusNumberDuplicates(
    numbers: number[],
    bonusNumber: number
  ) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATES);
    }
  }

  public getBonusNumber() {
    return this.bonusNumber;
  }
}

export default WinningLotto;
