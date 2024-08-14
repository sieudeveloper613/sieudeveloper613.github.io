import { useState } from "react"
import QRCode from "qrcode.react";
import styles from "./ShareComponent.module.scss"
import {
  EmailIcon,
  ViberIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailShareButton,
  ViberShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import useDataManagementStore from "../../useDataManagementStore";
import ENV from "../../../../../../core/ENV";

export default function ShareComponent() {
  const {
    isShare,
    setIsShare,
    responsibleData,
  } = useDataManagementStore();

  /** create state */
  const [copiedMessage, setCopiedMessage] = useState("Press to copy");

  const listSocial = [
    { title: "Email", name: EmailShareButton, icon: EmailIcon },
    { title: "Facebook", name: FacebookShareButton, icon: FacebookIcon },
    { title: "Whatsapp", name: WhatsappShareButton, icon: WhatsappIcon },
    { title:"Linkedin", name:LinkedinShareButton , icon:LinkedinIcon},
    { title:"Viber", name:ViberShareButton , icon: ViberIcon},
    // {title:"Messager",name:FacebookMessengerIcon , icon:FacebookMessengerIcon},
    // {title:"Telegram",name:TelegramShareButton , icon:TelegramIcon},
    // {title:"Twitter",name:TwitterShareButton , icon:TwitterIcon},
    // {title:"Weibo",name:WeiboShareButton , icon:WeiboIcon},
    // {title:"Pocket",name:PocketShareButton , icon:PocketIcon},
    // {title:"Pinterest",name:PinterestShareButton , icon:PinterestIcon},
  ]

  // const URL: string = `${ENV.HOST_01}/quan-tri-du-lieu?code=${responsibleData?.qrCode}`
  const URL: string = `${ENV.API_HOST_1}/quan-tri-du-lieu?qrCode=${responsibleData?.qrCode}`;


  // Xu ly press to copy
  function unsecuredCopyToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }

  function handleCopy() {
    setCopiedMessage("Đã sao chép")
    if (window.isSecureContext && navigator.clipboard) {
      // when protocol is "https"
      navigator.clipboard.writeText(URL);
    } else {
      // when protocol is "http"
      unsecuredCopyToClipboard(URL);
    }
  }

  function outFunc() {
    setCopiedMessage("Press to copy")
  }

  return (
    <div className={styles["container-share"]} style={{ display: `${isShare ? "flex" : "none"}` }}>
      <div className={styles["wrap"]}>
        <div className={styles["header-share"]}>
          <p className={styles["text"]}>Chia sẻ</p>
          <div className={styles["icon"]} onClick={() => { setIsShare(false) }} >close</div>
        </div>

        <div className={styles["list-share"]}>
          {listSocial.map((item, index) => {
            const BtnComponent = item.name
            const IconComponent = item.icon
            // console.log("")
            return (
              <div key={index} className={styles["item-share"]}>
                <BtnComponent url={URL}>
                  <IconComponent size={60} round={true} />
                </BtnComponent>
                <span className={styles["text"]}>{item.title}</span>
              </div>
            )
          })}
        </div>

        <div className={styles.qrcode}>
          <QRCode value={URL} size={250} />
        </div>

        <div className={styles["footer-share"]}>
          <span className={styles["data-url"]}>{URL}</span>
          <div className={styles["tooltip"]}>
            <button type="button" className={styles["btn-copy"]} onMouseLeave={outFunc} onClick={handleCopy}>
              <span className={styles["tooltiptext"]}>{copiedMessage}</span>
              Copy
            </button>
          </div>
        </div>
        
      </div>
    </div>
  )
}
