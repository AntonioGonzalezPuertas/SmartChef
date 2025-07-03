import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profiles: any[] = [];

  // Urls
  private findAllProfilesUrl = environment.BASE_URL + '/profiles/findAll';
  private newProfilesUrl = environment.BASE_URL + '/profiles/';
  private updateProfilesUrl = environment.BASE_URL + '/profiles/';
  private deleteProfilesUrl = environment.BASE_URL + '/profiles/';

  private httpClient = inject(HttpClient);

  constructor() {}

  async ngOnInit() {
    await this.getProfilesAll();
  }

  public async getProfilesAll(): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const profiles = await firstValueFrom(
      this.httpClient.post(this.findAllProfilesUrl, {}, headers)
    );
    if (profiles) {
      this.profiles = <any>profiles;
    } else {
      console.error('Error fetching profiles:', profiles);
    }

    return this.profiles;
  }

  async getProfilesById(authorId: string) {
    if (this.profiles.length === 0) {
      const result = await this.getProfilesAll();
    }
    return this.profiles.filter((profile) => profile._id === authorId)[0];
  }

  async getProfilesByEmail(email: string) {
    if (this.profiles.length === 0) {
      await this.getProfilesAll();
    }
    return this.profiles.filter((profile) => profile.email === email)[0];
  }

  async addProfile(profile: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result: any = await firstValueFrom(
      this.httpClient.post(this.newProfilesUrl, profile, headers)
    );
    //console.log('Profile added :', result);
    if (result) {
      console.log('Email sent:', result);
      profile['_id'] = result._id;
      //console.log('Profile added :', profile);
      this.profiles.push(profile);
    } else {
      console.error('Error adding profile:');
    }

    return profile;
  }

  async updateProfile(profile: any, token: string | null): Promise<any> {
    //console.log('updateProfile', profile);

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.put(this.updateProfilesUrl + profile.id, profile, headers)
    );
    if (result) {
      const index = this.profiles.findIndex(
        (profileToUpdate) => profileToUpdate._id === profile.id
      );
      //console.log('Index:', index);
      if (index !== -1) {
        for (const key in profile) {
          if (profile.hasOwnProperty(key)) {
            this.profiles[index][key] = profile[key]; // Update the field
          }
        }
        return this.profiles[index];
      }
      return null;
    } else {
      console.error('Error adding profile:', result);
      return null;
    }
  }

  async deleteProfile(id: string, token: string | null): Promise<boolean> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.delete(this.deleteProfilesUrl + id + '/' + token, headers)
    );
    if (result) {
      console.log('Profile deleted:', result);
      return true;
    } else {
      console.error('Error deleting profile:', result);
      return false;
    }
  }

  async authProfile(email: string, password: string) {
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
      };
      const authData = { email: email, password: password };
      const valid = await firstValueFrom(
        this.httpClient.post(
          environment.BASE_URL + '/auth/login',
          authData,
          headers
        )
      );
      return valid;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        (error as any).error &&
        'message' in (error as any).error
      ) {
        console.error('Error:', (error as any).error.message);
        throw (error as any).error.message;
      } else {
        console.error('Error:', error);
        throw error;
      }
    }
  }

  async logout(sessionId: string, token: string | null) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const authData = { sessionId: sessionId };
    const result = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/auth/logout',
        authData,
        headers
      )
    );
  }

  async changePassword(
    id: string,
    token: string | null,
    data: any
  ): Promise<boolean> {
    const changePasswordData = {
      id: id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await firstValueFrom(
      this.httpClient.put(
        environment.BASE_URL + '/auth/changePassword/' + id,
        changePasswordData,
        headers
      )
    )
      .then((response) => {
        console.log('Password changed successfully:', response);
        return true; // Password changed successfully
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        return false; // Password change failed
      });
  }

  async sendResetPasswordEmail(email: string): Promise<any> {
    const data = { email: email };
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    console.log('Sending reset password email to:', email);
    return await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/auth/forgot-password',
        data,
        headers
      )
    )
      .then((response) => {
        console.log('Reset password email sent:', response);
        return response; // Return the response from the server
      })
      .catch((error) => {
        console.error('Error sending reset password email:', error);
        return null; // Return null in case of error
      });
  }
}
