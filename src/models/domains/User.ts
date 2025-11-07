import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';
import Lotto from './Lotto.js';

class User {
  private readonly purchasePrice: number;
  private readonly lottos: Lotto[] = [];

  constructor(purchasePrice: number, lottos: Lotto[]) {
    this.purchasePrice = purchasePrice;
    this.valiadtePurchasePrice(purchasePrice);
    this.lottos = lottos;
  }

  private valiadtePurchasePrice(purchasePrice: number) {
    if (purchasePrice % LOTTO_CONFIG.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_PRICE);
    }
  }

  //   public setPurchasedLottos(lottos: Lotto[]) {
  //     this.lottos = lottos;
  //   }

  public getPurchasedLottos() {
    return this.lottos;
  }

  public getPurchasePrice() {
    return this.purchasePrice;
  }
}

export default User;
