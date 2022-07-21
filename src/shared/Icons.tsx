import {SvgIcon, SvgIconProps} from '@mui/material';
import { 
    FaHome,
    FaUserCog,
    FaUserAlt,
    FaUserPlus,
    FaBriefcase
} from "react-icons/fa";
import { BiHide, BiShow } from "react-icons/bi";
import { 
    MdExpandMore,
    MdChevronRight,
    MdFileDownloadDone,
    MdCancel,
    MdClose,
    MdDriveFileMove,
    MdOutlineFileCopy,
    MdDriveFileMoveRtl,
    MdDelete,
    MdCreateNewFolder,
    MdAddPhotoAlternate,
    MdSave,
    MdEdit,
    MdOutlineGpsFixed,
    MdLogout,
    MdLogin,
    MdLocationOn,
    MdAdd,
    MdPhoneInTalk,
    MdArrowRight
} from "react-icons/md";
import { 
    BsFillFolderFill,
    BsFillFolderSymlinkFill, 
    BsImageFill,
    BsThreeDotsVertical,
    BsImages,
    BsBookmarkCheckFill,
    BsCameraFill,
    BsStopwatch
} from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { 
    IoDuplicate,
    IoCheckmarkCircle
} from "react-icons/io5";

import {
    IoMdAddCircleOutline
} from "react-icons/io";

import { 
    AiTwotoneShop,
    AiOutlineShop,
    AiOutlineProject,
    AiFillProject
} from "react-icons/ai";

import {
    FiMenu,
    FiUpload
} from "react-icons/fi";

import { GrCertificate } from "react-icons/gr";

import { FcGoogle } from "react-icons/fc";

import { GiSkills } from "react-icons/gi";

export const WatchIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsStopwatch /></SvgIcon>)
}

export const ArrowRightIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdArrowRight /></SvgIcon>)
}

export const CallIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdPhoneInTalk /></SvgIcon>)
}

export const CertificateIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><GrCertificate /></SvgIcon>)
}

export const UploadIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FiUpload /></SvgIcon>)
}

export const CameraIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsCameraFill /></SvgIcon>)
}

export const AddIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><IoMdAddCircleOutline /></SvgIcon>)
}

export const PlusIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdAdd /></SvgIcon>)
}

export const LocationIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdLocationOn /></SvgIcon>)
}

export const BriefcaseIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FaBriefcase /></SvgIcon>)
}

export const SkillsIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><GiSkills /></SvgIcon>)
}

export const GoogleIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FcGoogle /></SvgIcon>)
}

export const UserIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FaUserAlt /></SvgIcon>)
}

export const ProjectIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><AiOutlineProject /></SvgIcon>)
}

export const SubscriptionIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsBookmarkCheckFill /></SvgIcon>)
}

export const ProfileIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FaUserCog /></SvgIcon>)
}

export const LogoutIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdLogout /></SvgIcon>)
}

export const LoginIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdLogin /></SvgIcon>)
}

export const SignUpIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FaUserPlus /></SvgIcon>)
}

export const MenuIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FiMenu /></SvgIcon>)
}

export const HomeIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><FaHome /></SvgIcon>)
}

export const ExpandIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdExpandMore /></SvgIcon>)
}

export const RightIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdChevronRight /></SvgIcon>)
}

export const FolderIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsFillFolderFill /></SvgIcon>)
}

export const AddFolderIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdCreateNewFolder /></SvgIcon>)
}

export const FolderShortcutIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsFillFolderSymlinkFill /></SvgIcon>)
}

export const FolderBackIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdDriveFileMoveRtl /></SvgIcon>)
}

export const DoneIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdFileDownloadDone /></SvgIcon>)
}

export const CancelIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdCancel /></SvgIcon>)
}

export const CloseIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdClose /></SvgIcon>)
}

export const MinusIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BiMinus /></SvgIcon>)
}

export const ImageIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsImageFill /></SvgIcon>)
}

export const ImageCopyIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsImages /></SvgIcon>)
}

export const AddImageIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdAddPhotoAlternate /></SvgIcon>)
}

export const OptionIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BsThreeDotsVertical /></SvgIcon>)
}

export const CopyIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdOutlineFileCopy /></SvgIcon>)
}

export const MoveIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdDriveFileMove /></SvgIcon>)
}

export const DeleteIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdDelete /></SvgIcon>)
}

export const ShowIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BiShow /></SvgIcon>)
}

export const HideIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><BiHide /></SvgIcon>)
}

export const SaveIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdSave /></SvgIcon>)
}

export const EditIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdEdit /></SvgIcon>)
}

export const DuplicateIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><IoDuplicate /></SvgIcon>)
}

export const GpsIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><MdOutlineGpsFixed /></SvgIcon>)
}

export const ShopIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><AiTwotoneShop /></SvgIcon>)
}

export const ShopCopyIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><AiOutlineShop /></SvgIcon>)
}

export const CheckIcon = (props:SvgIconProps) => {
    return (<SvgIcon {...props} inheritViewBox><IoCheckmarkCircle /></SvgIcon>)
}