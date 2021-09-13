import { Modal } from "tailwindcss-stimulus-components"

export default class ExtendedMainModal extends Modal {
  static targets = ["mainform", "mainerrors"];
  static values = { from: Number }

  connect() {
    console.log(`EMMC connect ${this}`);
    super.connect();
  }

  open(e) {
    console.log(`EMMC open ${this.fromValue}`);
    super.open(e);
    // Always want to clear errors on open
    this.clearErrors();
    // Reset all values on open
    this.resetValues();
  }

  handleSuccess({ detail: { success } }) {
    console.log(`EMMC handleSuccess ${this}`);
    if (success) {
      super.close();
    }
  }

  clearErrors() {
    console.log(`EMMC clearErrors ${this}`);
    if (this.hasMainerrorsTarget) {
      this.mainerrorsTarget.remove();
    }
  }

  resetValues() {
    console.log(`EMMC resetValues ${this}`);
    if (this.hasMainformTarget) {
      // The rest should be enough
      this.mainformTarget.reset();
      // Therefore after errors the reset seems to not work properly, so force values to be blanked
      const container = document.querySelector("#contact_main_form");
      if (container) {
        const matches = container.querySelectorAll("input.input");
        matches.forEach(function(userInput) {
          userInput.value = "";
        });
      }
    }
  }
}
