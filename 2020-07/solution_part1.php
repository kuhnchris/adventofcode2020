<?
$fc = file_get_contents("./input.txt");
$fcArr = explode('\r\n', $fc);

$bagArray = array();
$bagEx = '/(?:(?:(\d) )?([^.\n ]* [^ ]*){1} (?:bag)s?)/m';
foreach ($fcArr as $line) {
    $head = "";
    preg_match_all($bagEx, $line, $matches, PREG_SET_ORDER, 0);
    foreach ($matches as $match) {
        //print_r($match[1] . " " . $match[2]."\n");
        if ($match[1] == "" && $match[0] != "no other bags") {
            //print("🤮 Determine bag name: ".$match[0]."\n");
            $head = $match[2];
        } else {
            if ($match[0] == "no other bags") {
                // contains 0 other bag (to make it easier for ourselves: not containing ourselves.)
                $match[1] = 0;
                $match[2] = $head;
            }
            //print("😭 Added new bag ".$match[2]." ".$match[1]." times into ".$head."\n");
            array_push($bagArray, array($head, $match[1], $match[2]));
        }

    }

}
//print_r($bagArray);


$solvedColors = array();
function recursiveResolve($headName,$level, &$solvedColors){
    global $bagArray;
    $retNum = 0;
    $prefix = "";
    for ($i=0; $i < $level; $i++) { 
        $prefix = $prefix."  ";
    }
    print($prefix.$headName.": 🖐 there are ".count($solvedColors)." colors solved.\n");

    if (in_array($headName,$solvedColors)){
        print($prefix.$headName.": already solved.\n");
        return $retNum - 1;
    }

    // for part 1: just push the color in so we can check it.
    array_push($solvedColors,$headName);
    
    foreach($bagArray as $bag){
        if ($bag[2] == $headName){
            if ($bag[0] != $headName){
                print($prefix.$headName.": > ".$bag[0]." resolving...\n");
                $retNum = $retNum + 1 + recursiveResolve($bag[0],$level+1, $solvedColors);
            }
        }
    }
    print($prefix.$headName.": finished.(".$retNum.") \n");
    return $retNum;
}

$retNum = recursiveResolve("shiny gold",0, $solvedColors);
$result = count($solvedColors) - 1;
print($retNum."\n");

?>