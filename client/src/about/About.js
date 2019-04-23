import React, { Component } from "react";
import Avatars from './Avatars.js';

export default class About extends Component {
    render() {
        return(
            <div className="about-page">
                <div className = "our-mission">
                    <h1 style = {{padding: "40pt 0pt 5pt 120pt"}}>Our Mission</h1>
                    <p style = {{color: "black", fontSize: 22, padding: "0pt 60pt 0pt 60pt"}}>
                    Our mission is to provide a centralized repository of information from the Canadian public sector
                    salary records and allow you to utilize data to inform, guide, 
                    and supplement research, with an emphasis on high-earners in policing.</p>
                </div>
                
                <div className = "our-users">
                    <h1 style = {{padding: "40pt 0pt 5pt 120pt"}}>Who This is For</h1>
                    <p style = {{color: "black", fontSize: 22, padding: "0pt 60pt 0pt 60pt" }}>
                    From employees in the policing sector to concerned citizens,
                    Detectively is aimed for anyone interested in analyzing public sector workers. 
                    Detectively gives you the ability to make wide-scale comparisons of the public sector,
                    ranging from comparing individual salaries to looking at the relationship of police income vs.
                    crime trends in their area.
                    </p>
                </div>

                <div className = "our-team">
                    <h1 style = {{padding: "40pt 0pt 5pt 120pt"}}>Our Team</h1>
                    <Avatars></Avatars>
                </div>

                <div className = "references">
                    <h1 style = {{padding: "80pt 0pt 5pt 120pt"}}>References</h1>
                    <p style = {{color: "black", fontSize: 22, padding: "0pt 60pt 0pt 60pt", fontWeight: "450" }}>
                    Salary data:
                    </p>
                    <p style = {{color: "black", fontSize: 18, padding: "0pt 0pt 0pt 60pt" }}>
                    Ontario. (2019). Public Salary Disclosure of 2018 [all sectors and seconded employees], Retrieved from:
                    </p>
                    <a style = {{fontSize: 18, padding: "0pt 0pt 0pt 80pt" }} 
                    href="https://www.ontario.ca/page/public-sector-salary-disclosure-2018-all-sectors-and-seconded-employees"
                    >https://www.ontario.ca/page/public-sector-salary-disclosure-2018-all-sectors-and-seconded-employees</a>


                    <p style = {{color: "black", fontSize: 18, padding: "30pt 0pt 0pt 60pt" }}>
                    Alberta. (2019). Salary and Severance Disclosure, Retrieved from:
                    </p>
                    <a style = {{fontSize: 18, padding: "0pt 0pt 80pt 80pt" }} 
                    href="https://www.alberta.ca/salary-disclosure-table.cfm"
                    >https://www.alberta.ca/salary-disclosure-table.cfm</a>


                    <p style = {{color: "black", fontSize: 22, padding: "30pt 00pt 0pt 60pt", fontWeight: "450"}}>
                    Crime data: 
                    </p>
                    <p style = {{color: "black", fontSize: 18, padding: "0pt 00pt 0pt 60pt"}}>
                    Statistics Canada. (2019). Crime Severity Index and Weighted 
                    Clearance Rates [Table 35-10-0026-01], Retrieved from: 
                    </p>
                    <a style = {{fontSize: 18, padding: "0pt 0pt 0pt 80pt" }} 
                    href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3510002601"
                    >https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3510002601</a>
                    
                    <p style = {{color: "black", fontSize: 18, padding: "30pt 00pt 0pt 60pt"}}>
                    Statistics Canada. (2019). Incident-Based Crime Statistics [Table 35-10-0177-01], Retrieved from: 
                    </p>
                    <a style = {{fontSize: 18, padding: "0pt 0pt 80pt 80pt" }} 
                    href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3510017701"
                    >https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3510017701</a>
                    
                </div>

            </div>
        );
        
    }
}