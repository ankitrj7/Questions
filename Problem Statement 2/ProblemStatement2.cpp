#include <iostream>
#include <boost/algorithm/string.hpp>
#include<bits/stdc++.h>
using namespace std;
int main() {
    string str,reverseOfStr;
    int t;
    cin>>t;
    while(t--)
    {
        cin>>str;
        boost::to_upper(str);

        reverseOfStr = str;
        reverse(reverseOfStr.begin(),reverseOfStr.end());
        if(reverseOfStr==str)
            cout<<"Palindrome"<<endl;
        else
            cout<<"Not Palidrome"<<endl;
    }
	// your code goes here
	return 0;
}

