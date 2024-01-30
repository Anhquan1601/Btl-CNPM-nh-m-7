// mot nhom co n ban nam va m ban nu(m,n>=5) . co bao nhieu cach chon ra 5 ban hoc sinh trong do co ca nam va nu  
#include <iostream>
using namespace std; 
// Hàm tính to hop C(n, k)
int comb(int n, int k) {
    if (k == 0 || k == n) {
        return 1;
    }
    return comb(n - 1, k - 1) + comb(n - 1, k);
}

int main() {
    int n ; 
    cout << "so hoc sinh nam: " ;
    cin >> n; 
    int m ;
    cout << "so hoc sinh nu: ";
    cin >> m; 
    
    
    // Tong so cách chon= so cach chon 5 hoc sinh tu tat cac hoc sinh - so cach chon 5 hoc sinh tu m hoc sinh nu - so cach chon 5 hoc sinh tu n hoc sinh nam  
    int tong = comb(m+n,5) - comb(m,5) - comb(n,5);  

    cout << "So cach chon 5 hoc sinh trong do co ca nam va nu la : "<< tong << endl;

    return 0;
}

