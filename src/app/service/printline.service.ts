import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintLineService {
    
  MaxLength: number;    
  rightLength : number = 10;
  leftLength : number;
  breakline : string = "\n";
  
  footerRightLength : number = this.rightLength + 3;
  footerLeftLength : number;

  Init(max : number) {
      this.MaxLength = max;
      this.leftLength = this.MaxLength - this.rightLength;
      this.footerLeftLength = this.MaxLength - this.footerRightLength;
  }



  AppendLine(text: string, text2: string): string
  {
      return this.AppendLeft(text) + this.AppendRight(text2) + this.breakline;
  }

  AppendFooterLine(text : string, text2 : string,special: string =  null, special2 : string = null)
  {
      return this.AppendCustomLeft(text,this.footerLeftLength,special) + this.AppendCustomRight(text2,this.footerRightLength,special2) + this.breakline;
  }

  AppendTextRightLine(text : string,text2 : string,special : string = null, special2 : string = null) : string
  {
      return this.TextRight(text,this.footerLeftLength,special) + this.AppendCustomRight(text2,this.footerRightLength,special2) + this.breakline;
  }

  PrintRight(text : string) : string
  {
      if(text)
      {
          return this.AppendCustomRight(text,this.MaxLength) + this.breakline;
      }
  }

  
  AppendLeft(text : string) : string
  {
      if(text)
      {
          if(text.length <= this.leftLength)
          {
              return this.AppendCustomLeft(text,this.leftLength);
          }
          else
          {
              return this.AppendLongString(text,this.leftLength);
          }
      }
  }

  AppendRight(text : string) : string
  {
      if(text)
      {
          if(text.length <= this.rightLength)
          {
              return this.AppendCustomRight(text,this.rightLength);
          }
          else
          {
              return this.AppendLongString(text,this.rightLength,true)
          }
      }
  }

  AppendCenter(text : string) : string
  {
      let result : string = "";
      if(text)
      {
          let length : number = this.MaxLength - text.length;
          result = this.GenerateWhiteSpace(Math.floor(length /2)) + text + this.breakline;
      }
      return result;
  }

  TextRight(text : string, length? : number,special? : string) : string
  {
      let result : string = "";
      let left : number = length? length : this.leftLength;
      if(text)
      {
          if(text.length <= left)
          {
              if(special)
              {
                  let space : number = left - (text.length + special.length);
                  result += this.GenerateWhiteSpace(space) + text + special;
              }                
          }
          return result;
      }
  }

  TextLeft(text : string,rightLength : number) : string
  {
      let result : string = "";
      if(text)
      {
          if(text.length <= rightLength)
          {
              let space : number = rightLength - text.length;
              result += text + this.GenerateWhiteSpace(space) ;
          }
          return result;
      }
  }

  AppendCustomLeft(text : string,leftLength : number, special : string = null) : string
  {
      let space : number = 0;
      let result : string = "";
      
      if(special)
      {
          space = (leftLength - text.length) - special.length;
          result += text +  this.GenerateWhiteSpace(space) + special;
          return result;
      }
      else
      {
          space = leftLength - text.length;
          result += text +  this.GenerateWhiteSpace(space);
          return result;
      }
      
  }
  AppendCustomRight(text : string,rightLength : number,special : string = null) : string
  {
      let space : number = 0;
      let result : string = "";
      if(special)
      {
          space = (rightLength - text.length) - special.length;
          result += special + this.GenerateWhiteSpace(space) + text;
          return result;
      }
      else
      {
          space = (rightLength - text.length);
          result += this.GenerateWhiteSpace(space) + text;
          return result;
      }        
  }

  AppendLongString(text : string,limit : number,right : boolean = false) : string
  {
      let rest : number = 0;       
      let space : number = 0;

      if(text)
      {
          let output : string = [text.slice(0, limit), this.breakline,text.slice(limit)].join('');        
          rest = output.length - limit;
          
          if(rest > limit)
          {
              output = output.substr(0,limit*2);
          }
          space = limit - rest + this.breakline.length; 
          if(right)
          {
              return output = this.GenerateWhiteSpace(space) + output;
          }else
          {
              return output += this.GenerateWhiteSpace(space);               
          }
      }                
  }

  leftnotecut(text : string) : string{
      let enter : string[] = [];
      let output : string = "";

      enter = text.trim().split("\n");
      enter.forEach(x=>{
          output += this.AppendLongCutString(x);
      })

      output += "\n";          
      output = output;
      return output;
  }

   
  AppendLongCutString(text: string): string {
     
      let split : string[] = [];
      let output : string = "";
      let chopped : string = "";

      split  = text.trim().split(" ");        
      split.forEach(x=> 
        {
          if(output.length < this.MaxLength - 5)
          {
            output += x.trim() + " ";
           
          }
          else 
          {
            chopped += x.trim() + " " ;
          }
        })        
        output += "\n";          
        output = output;
        if(chopped)output += this.AppendLongCutString(chopped);
        return output;
  }

  AppendLongStringCenter(text : string) : string
  {
      if(text)
      {
          let output : string = [text.slice(0, this.MaxLength), this.breakline,text.slice(this.MaxLength)].join('');  
          let purestring = output.trim();      
          let rest : number = purestring.length - this.MaxLength;

          let inout : string = ""
          if(rest > 0)
          {
              inout = purestring.slice(0,this.MaxLength + 1);
              let chopstring : string = purestring.substr(this.MaxLength + 1);
              inout += this.AppendLongStringCenter(chopstring.trim());
          } else if(rest <= 0)
          {
              inout += this.AppendCenter(text);
          }
          return inout;
      }
  }

 

  GenerateWhiteSpace(space : number) : string
  {
      let i : number = 1;
      let whitespace : string = "";
      
      if(space >= 0)
      {    
          for(i;i <= space ;i++)
          {
              whitespace +=" ";       
          }
      }
      return whitespace;
  }
  Separator() : string
  {
      let separator : string = "";
      for(let i : number = 0;i < this.MaxLength ;i++)
      {
          separator +="-";       
      }
      return separator + this.breakline;
  }
  Feed() : string 
  {
      return this.breakline + this.breakline + this.breakline + this.breakline + this.breakline;
  }
}
