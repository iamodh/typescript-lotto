import User from '../models/domains/User.js';
import WinningLotto from '../models/domains/WinningLotto.js';
import Calculator from '../models/services/Calculator.js';
import Checker from '../models/services/Checker.js';
import LottoFactory from '../models/services/LottoFactory.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class LottoController {
  private inputView: InputView;
  private outputView: OutputView;
  private checker: Checker;
  private calculator: Calculator;
  private lottoFactory: LottoFactory;

  constructor(
    inputView: InputView,
    outputView: OutputView,
    checker: Checker,
    calculator: Calculator,
    lottoFactory: LottoFactory
  ) {
    this.inputView = inputView;
    this.outputView = outputView;
    this.checker = checker;
    this.calculator = calculator;
    this.lottoFactory = lottoFactory;
  }

  public async start() {
    try {
      const user = await this.purchaseLottos();

      this.outputView.printPurchasedLottos(user.getPurchasedLottos());
      this.outputView.printNewLine();

      const winningLotto = await this.getWinningLotto();

      const { winningStatistic, profitRate } = this.getResult(
        user,
        winningLotto
      );

      this.outputView.printWinningStatistic(winningStatistic);
      this.outputView.printProfitRate(profitRate);
    } catch (error) {
      this.outputView.printErrorMessage(error.message);
    }
  }

  private async purchaseLottos() {
    const purchasePrice = await this.inputView.getPurchasePrice();
    this.outputView.printNewLine();

    const purchasedLottos = this.lottoFactory.purchaseLottos(purchasePrice);
    const user = new User(purchasePrice, purchasedLottos);

    return user;
  }

  private async getWinningLotto() {
    const winningNumbers = await this.inputView.getWinningNumbers();
    this.outputView.printNewLine();

    const bonusNumber = await this.inputView.getBonusNumber();
    this.outputView.printNewLine();

    return new WinningLotto(winningNumbers, bonusNumber);
  }

  private getResult(user: User, winningLotto: WinningLotto) {
    const winningStatistic = this.checker.checkWinningStatistic(
      user.getPurchasedLottos(),
      winningLotto
    );

    const profitRate = this.calculator.calculateProfitRate(
      user.getPurchasePrice(),
      winningStatistic
    );

    return { winningStatistic, profitRate };
  }
}

export default LottoController;
