import { useState } from "react";
import { Insert } from "../../functional/1-insert/Insert";
import { Encoded } from "../../functional/2-encoded/Encoded";
import { Readyforcss } from "../../functional/3-readyforcss/Readyforcss";
import { Demo } from "../../functional/4-demo/Demo";
import { addNameSpace, encodeSVG } from "./helpers";
import "./Grid.scss";

export function Grid() {
    const [encodeInput, setEncodeInput] = useState('');
    const [decodeInput, setDecodeInput] = useState('');
    const [quoteType, setQuoteType] = useState('double');

    const resultCss = encodeInput.length === 0 ? '' : `url(${quoteType === 'double' ? '"' : "'"}data:image/svg+xml,${decodeInput}${quoteType === 'double' ? '"' : "'"})`;

    /**Encode - start*/
    function handleEncodeChange(input:string) {
        setEncodeInput(input);

        const namespaced = addNameSpace(input, quoteType);
        const escaped = encodeSVG(namespaced, quoteType);
        setDecodeInput(escaped);
    }
    /**Encode - end */

    /**Decode - start */
    function handleDecodeChange(input:string) {
        setDecodeInput(input);

        const value = input.trim()
        .replace(/background-image:\s{0,}url\(/, ``)
        .replace(/["']{0,}data:image\/svg\+xml,/, ``)
        .replace(/["']\);{0,}$/, ``);

        setEncodeInput(decodeURIComponent(value));
    }
    /**Decode - end */

    function handleRadioChange(input:string) {
        setQuoteType(input);

        const namespaced = addNameSpace(encodeInput, input);
        const escaped = encodeSVG(namespaced, input);
        setDecodeInput(escaped);
    }

    return (
        <div className="app-main__wrap">
            <div className="app-container">
                <div className="app-main__head">
                    <div className="app-main__quoteselection" role="group" aria-labelledby="app_main_quoteselection_title">
                        <p id="app_main_quoteselection_title">External quotes:</p>

                        {/* change to radio */}
                        <label className="app-main__radio">
                            <input type="radio" name="quotation" id="single" checked={quoteType === 'single'}
                            onChange={()=>handleRadioChange('single')}/>
                            <span>single</span>
                        </label>
                        <label className="app-main__radio">
                            <input type="radio" name="quotation" id="double" checked={quoteType === 'double'}
                            onChange={()=>handleRadioChange('double')}/>
                            <span>double</span>
                        </label>
                        {/* <a href="#" className="app-main__quotelink">single</a> */}
                        {/* <a href="#" className="app-main__quotelink">double</a> */}
                    </div>
                </div>
                <div className="app-main__grid">
                    <Insert input={encodeInput} handlerFunction={handleEncodeChange}/>
                    <Encoded input={decodeInput} handlerFunction={handleDecodeChange}/>
                    <Readyforcss input={resultCss}/>
                    <Demo image={resultCss}/>
                </div>
            </div>
        </div>
    )
}
