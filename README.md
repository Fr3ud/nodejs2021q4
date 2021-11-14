## Ciphering CLI Tool

CLI tool should accept 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

**Usage example:**  

```bash
$ node index.js -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`
