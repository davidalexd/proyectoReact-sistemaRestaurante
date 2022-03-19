package com.restaurant.api.dto.response;


import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class SummaryReport {
    private Long current;
    private Long last;
    private String type;
    private Double percentage;
    private String status;

    public SummaryReport(Long current, Long last,String type){
        this.current = current;
        this.last = last;
        this.type = type;
        this.percentage = checkPercentage();
        this.status = (this.current-this.last)>0?"positive":"negative";
    }
    private Double checkPercentage(){
        Double tempPercentage = ((this.current - this.last) / (double)Math.abs(this.last)) * 100;
        if(tempPercentage.isInfinite()){
            return 100d;
        }
        if(tempPercentage.isNaN()){
            return 0d;
        }
        return tempPercentage;
    }

}
