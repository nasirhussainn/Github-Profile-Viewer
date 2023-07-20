<template>
    <v-app>
        <v-theme-provider theme="high-contrast">
        <v-container>
            <v-row>
                <v-col>
                    <h1>GitHub Profile Viewer</h1>
                    <v-text-field v-model="username" label="Enter GitHub username" placeholder="Enter GitHub username" />
                    <v-btn @click="fetchProfile">Fetch Profile</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="profile">
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-avatar size="150" :src="profile.avatar_url" class="rounded-lg">
                                <v-img v-if="profile.avatar_url" :src="profile.avatar_url" />
                                <v-icon v-else class="d-flex justify-center align-center" color="primary">
                                    mdi-account
                                </v-icon>
                            </v-avatar>
                            <v-spacer />
                            <h2>{{ profile.name }}</h2>
                        </v-card-title>
                        <v-card-text>
                            <p>{{ profile.bio }}</p>
                            <p>
                                <v-chip>Public repos:</v-chip> {{ profile.public_repos }}
                            </p>
                            <p>
                                <v-chip>Followers:</v-chip> {{ profile.followers }}
                            </p>
                            <p>
                                <v-chip>Location:</v-chip> {{ profile.location }}
                            </p>
                            <!-- <p>
                                <v-chip>Email:</v-chip> {{ profile.email }}
                            </p>
                            <p>
                                <v-chip>Website:</v-chip> {{ profile.website }}
                            </p>
                            <p>
                                <v-chip>Followers:</v-chip> {{ profile.followers }}
                            </p> -->
                            <!-- <p>
                                <v-chip>Contributions:</v-chip> {{ profile.contributions }}
                            </p>
                            <p>
                                <v-chip>Starred repos:</v-chip> {{ profile.starred_repos }}
                            </p>
                            <p>
                                <v-chip>Organizations:</v-chip> {{ profile.organizations }} 
                            </p>-->
                            <v-row v-for="repo in profile.starred_repos" :key="repo">
                                <v-col>
                                    <v-card>
                                        <v-card-title>
                                            <h3>{{ repo.name }}</h3>
                                        </v-card-title>
                                        <v-card-text>
                                            <p>{{ repo.description }}</p>
                                            <p>
                                                <v-chip>Created at:</v-chip> {{ repo.created_at }}
                                            </p>
                                            <p>
                                                <v-chip>Updated at:</v-chip> {{ repo.updated_at }}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
        </v-theme-provider> 
    </v-app>
</template>

<script>
import axios from 'axios';


export default {
    name: 'ProfileViewer',

    data() {
        return {
            username: '',
            profile: null,
           
        };
    },
    methods: {
        fetchProfile() {
            axios.get(`https://api.github.com/users/${this.username}`)
                .then((response) => {
                    this.profile = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
                axios.get(`https://api.github.com/users/${this.username}/repos`)
                .then((response) => {
                    this.profile.starred_repos = response.data.repositories.starred;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
