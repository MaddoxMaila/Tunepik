<template>

	<div class="root-level-wrap">

		<!-- Users List Not Empty -->
		<template v-if="users.length > 0">

			<!-- Root Level Wrapper -->
			
			<CardGridBundler :users="users" v-if="showGrid"></CardGridBundler>
			<div class="list-group" v-else>
				
				<!-- For Loop! -->
				<template v-for="(user, index) in users">
				
						<UserRowBuilder :user="user" ></UserRowBuilder>

				</template>

			</div>

		</template>

		<!-- List Empty -->

		<template v-else >
			
			<div class="app-deleted-post grey-matter">
				
				<center>
					<span class="app-small-text">
						{{ message }}
					</span>
				</center>

			</div>

		</template>

	</div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import UserRowBuilder from './UserRowBuilder'
  import CardGridBundler from './CardGridBundler'

    export default {

        name       : "UserListBundler",
        components : {

        	UserRowBuilder,
        	CardGridBundler

        },
        data    	 : () => {

          return {

            screen 	 : globs.app.isMobile,

          }

        },
        props 		: ['users', 'message', 'grid'],
        computed : {

        	showGrid : function(){

        		return this.grid ? this.grid : true 

        	}

        }

    };
</script>

<style scoped>

</style>
