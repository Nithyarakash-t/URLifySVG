import { ChangeEvent } from "react";
import "./Encoded.scss";

export function Encoded({input, handlerFunction}:{readonly input:string, readonly handlerFunction:(input:string)=>void}) {
    /** Handle input - start */
    function changeHandler(event:ChangeEvent) {
        const target = event.currentTarget as HTMLTextAreaElement;
        handlerFunction(target.value);
    }
    /**Handle input - end */
    return (
        <section className="app-group" aria-labelledby="section_encoded_title">
            <div className="app-group__head" id="section_encoded_title">
                <h2 className="app-group__title">Encoded SVG:</h2>
                {/* <a href="#" aria-label="Copy encoded value to clipboard">Copy</a> */}
            </div>
            <div className="app-group__body">
                <textarea id="app_encoded_textarea" name="app_encoded_textarea" spellCheck="false" 
                value={input} onChange={changeHandler}></textarea>
            </div>
            <div className="app-group__foot">
                {/* <p>You may place encoded SVG here to decode it back</p> */}
            </div>
        </section>
    )
}