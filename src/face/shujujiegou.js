// 判断是否是相同的树
var isSameTree = function(p, q) {
    if(p == null && q == null) 
        return true;
    if(p == null || q == null) 
        return false;
    if(p.val != q.val) 
        return false;
    console.log(p.val, "p.val")
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

console.log(isSameTree([1,2], [1,2]), "isSameTree([1,2], [1,2,null])")