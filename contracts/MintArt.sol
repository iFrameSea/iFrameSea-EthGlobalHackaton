// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract IFRAMESEA is ERC721, ERC721URIStorage {

      mapping(uint256 => uint256) public nftLikes;
      mapping(uint256 => string[]) public nftComments;

    constructor(address initialOwner)
        ERC721("iFrameSea", "IFS")
    {}

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

      function likeNFT(uint256 _tokenId) public {
    nftLikes[_tokenId]++;
  }
  function getLikes(uint256 _tokenId) public view returns (uint256) {
  return nftLikes[_tokenId];
}

  function addComment(uint256 _tokenId, string memory _comment) public {
      require(bytes(_comment).length < 500); //only accept short comments
    nftComments[_tokenId].push(_comment);
  }

  //   function getComment(uint256 _tokenId) public view returns (uint256) {
  //   return nftComments[_tokenId];
  // }

  function burn(uint256 tokenId) public {
  _burn(tokenId);
}
}