import Vue from 'vue'
import Card from './Card'
import Child from './Child'
import Button from './Button'
import Checkbox from './Checkbox'

// My Components
import CardSlideBundler from './builders/userBuilders/CardSlideBundler'

// Desktop Components
import FeedPosts from './FeedPosts'
import DesktopBaseView from './desktop/DesktopBaseView'
import IconNav from './desktop/IconNav'
import DesktopNavBar from './desktop/DesktopNavBar'

// Mobile Components
import MobileBaseView from './mobile/MobileBaseView'
import MobileNavBar from './mobile/MobileNavBar'

import SlideSkeleton from './builders/skeletonBuilders/SlideSkeleton'
import Icon from './Icon'

import { HasError, AlertError, AlertSuccess } from 'vform'

// Components that are registered globaly.
[
  Card,
  Child,
  Button,
  Checkbox,
  HasError,
  AlertError,
  AlertSuccess,
  FeedPosts,
  DesktopBaseView,
  IconNav,
  DesktopNavBar,
  MobileBaseView,
  MobileNavBar,
  CardSlideBundler,
  SlideSkeleton,
  Icon
].forEach(Component => {
  Vue.component(Component.name, Component)
})
