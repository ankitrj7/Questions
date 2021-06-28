#include<bits/stdc++.h>
using namespace std;

bool isNum(char c){
    if(c >= '0' && c <= '9')
        return true;
    return false;
}
bool isDate(string dt){
    if(isNum(dt[0]) && isNum(dt[1]) && dt[2] == '/' && isNum(dt[3]) && isNum(dt[4]))
        return true;
    return false;
}

bool isTime(string timeStamp){
    int colonCount = 0;
    for(int i = 0; i < timeStamp.length(); i++){
        if(!isNum(timeStamp[i]) && timeStamp[i] != ':')
            return false;
        else if(timeStamp[i] == ':')
            colonCount++;
    }
    return colonCount == 2;
}
bool isTimeStamp(string s){
    if(s.length() < 14)
        return false;
    string dt = s.substr(0,5);
    string timeStamp = s.substr(6, 8);
    return isDate(dt) && isTime(timeStamp);
}

int main(){
    freopen("logs.txt","r",stdin);
    freopen("Errorlog.txt","w",stdout);

    string str;
    bool prevRecorded = false;
    int logCount = 0;
    while(getline(cin, str)){
        if(isTimeStamp(str)){
            logCount++;
            string logCode = str.substr(15, 7);
            if(logCode.find("ERROR") != string::npos  || logCode.find("WARNING")!= string::npos){
                cout << str << "\n";
                prevRecorded = true;
            }
            else
                prevRecorded = false;
        }
        else if(prevRecorded == true){
            cout << str << "\n";
        }
    }
}